# Security & Monitoring Configuration

**Last Updated**: November 21, 2025  
**Status**: ✅ Production-Ready  
**Database**: Supabase PostgreSQL with 22 tables

---

## 1. Keep-Alive Mechanism (Critical)

### Problem Solved
Supabase free tier databases are automatically paused after 7 days of inactivity. This would make the platform unavailable.

### Solution Implemented
**pg_cron Scheduled Jobs** - Two jobs maintain continuous activity:

#### Job 1: Database Keep-Alive (Every 15 minutes)
```sql
SELECT cron.schedule(
  'keep-alive-job-15min',
  '*/15 * * * *',
  'SELECT public.database_keep_alive();'
);
```
- **Frequency**: Every 15 minutes
- **Action**: Inserts health check record into `database_health_checks` table
- **Prevents**: Database pause due to inactivity
- **Status**: ✅ Active

#### Job 2: Activity Summary (Every hour)
```sql
SELECT cron.schedule(
  'database-activity-summary-hourly',
  '0 * * * *',
  'INSERT INTO public.database_health_checks...'
);
```
- **Frequency**: Every hour
- **Metrics Tracked**:
  - Total subscriber count
  - Activity logs (past 1 hour)
  - Rate limit events
- **Status**: ✅ Active

### Verification
```sql
SELECT jobid, schedule, command FROM cron.job;
```

**Current Jobs**:
| JobID | Schedule | Purpose |
|-------|----------|---------|
| 1 | */15 * * * * | Keep-alive ping |
| 2 | 0 * * * * | Hourly activity summary |

---

## 2. Rate Limiting

### Configuration
- **Limit**: 5 requests per IP per hour
- **Window**: 60 minutes
- **Endpoint**: `/api/subscribe`
- **Table**: `api_rate_limits`

### Implementation Details

#### Database Structure
```sql
CREATE TABLE api_rate_limits (
  id uuid PRIMARY KEY,
  endpoint text NOT NULL,
  ip_address inet NOT NULL,
  requests_count integer DEFAULT 1,
  window_start timestamp,
  window_end timestamp,
  metadata jsonb,
  created_at timestamp
);
```

#### Indexes for Performance
- `idx_rate_limits_endpoint` - Fast endpoint lookups
- `idx_rate_limits_ip` - Fast IP address lookups
- `idx_rate_limits_window` - Fast window expiration cleanup

#### API Response Headers
When rate limited, client receives:
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
Status: 429 Too Many Requests
```

#### Automatic Cleanup
Old rate limit records (>90 days) are automatically deleted:
```sql
function: cleanup_old_rate_limits()
trigger: Can be scheduled or called manually
```

---

## 3. Activity Logging

### Purpose
Tracks all subscription-related actions for compliance and audit purposes.

### Table Structure
```sql
CREATE TABLE subscription_activity (
  id uuid PRIMARY KEY,
  subscriber_id uuid NOT NULL (FK to subscribers),
  action text NOT NULL,
  ip_address inet,
  user_agent text,
  metadata jsonb,
  created_at timestamp
);
```

### Tracked Actions
1. `subscription_created` - New email added to waitlist
2. `duplicate_attempt` - Attempt to re-subscribe existing email
3. `api_error` - API errors during subscription
4. `rate_limit_exceeded` - Rate limit triggers

### Indexes
- `idx_subscription_activity_timestamp` - Query by time
- `idx_subscription_activity_subscriber` - Query by subscriber

### Data Retention
- **Default**: 90 days
- **Compliance**: GDPR compliant (configurable deletion)
- **Automated Cleanup**: Runs as scheduled job

---

## 4. Database Health Checks

### Table: `database_health_checks`
```sql
CREATE TABLE database_health_checks (
  id uuid PRIMARY KEY,
  check_timestamp timestamp,
  status text ('healthy', 'active', 'warning'),
  last_activity timestamp,
  connection_count integer,
  active_connections integer,
  metadata jsonb,
  created_at timestamp
);
```

### Health Status Values
- **healthy**: Normal operation, keep-alive job ran
- **active**: Recent subscriber activity detected
- **warning**: Potential issues (for future implementation)

### Metadata Fields
```json
{
  "function": "database_keep_alive",
  "version": "1.0",
  "type": "hourly_summary",
  "subscriber_count": 42,
  "activity_logs": 7,
  "rate_limit_events": 2
}
```

### Query Recent Health
```sql
SELECT * FROM database_health_checks
ORDER BY check_timestamp DESC
LIMIT 10;
```

---

## 5. Row-Level Security (RLS)

### Security Tables with RLS Enabled

| Table | RLS Status | Access Policy |
|-------|-----------|--------|
| `database_health_checks` | ✅ Enabled | Public read, Service role write |
| `subscription_activity` | ✅ Enabled | Service role only |
| `api_rate_limits` | ✅ Enabled | Service role only |
| `data_retention_logs` | ✅ Enabled | Service role only |
| `security_audit_logs` | ✅ Enabled | Service role only |
| `security_incidents` | ✅ Enabled | Service role only |

### RLS Policy Examples

**Health Checks** (Public Read, Service Role Write):
```sql
CREATE POLICY "Allow public to read health" 
  ON public.database_health_checks
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow service role to write health" 
  ON public.database_health_checks
  FOR INSERT TO service_role
  WITH CHECK (true);
```

**Sensitive Tables** (Service Role Only):
```sql
CREATE POLICY "Allow service role to manage activity logs" 
  ON public.subscription_activity
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
```

---

## 6. Data Retention & Compliance

### Retention Policy Table
```sql
CREATE TABLE data_retention_logs (
  id uuid PRIMARY KEY,
  table_name text NOT NULL,
  records_deleted integer,
  retention_days integer DEFAULT 90,
  deleted_before timestamp,
  status text ('completed', 'pending'),
  reason text,
  created_at timestamp
);
```

### Retention Schedule
- **Subscription Activity**: 90 days
- **Rate Limit Events**: 90 days
- **Health Checks**: 30 days (summaries kept longer)
- **Audit Logs**: 180 days (for compliance)

### Manual Cleanup
```sql
-- Delete old activity logs
DELETE FROM public.subscription_activity
WHERE created_at < now() - interval '90 days';

-- Delete old rate limit records
SELECT cleanup_old_rate_limits();
```

---

## 7. Security Extensions Installed

### Cryptography
- **pgcrypto**: AES-256 encryption, hash functions
  - Used for: Password hashing, data encryption
  - Status: ✅ Active

### Authentication
- **pgjwt**: JWT token generation and verification
  - Used for: Supabase authentication
  - Status: ✅ Active

### Secrets Management
- **supabase_vault**: Secure secrets storage
  - Used for: API keys, tokens, sensitive config
  - Status: ✅ Installed (available for future use)

### Audit & Compliance
- **pgaudit**: Comprehensive audit logging
  - Logs: DDL and DML operations
  - Status: ✅ Active

### Performance Monitoring
- **pg_stat_statements**: Query performance tracking
  - Monitors: Slow queries, resource usage
  - Status: ✅ Active

- **pg_stat_monitor**: Advanced statistics
  - Status: ✅ Available

### API & Functionality
- **pg_graphql**: GraphQL API generation
  - Status: ✅ Installed (available for API expansion)

- **vector**: AI embeddings support
  - Status: ✅ Available (for future AI features)

### Utilities
- **uuid-ossp**: UUID generation
  - Status: ✅ Active (used for primary keys)

- **citext**: Case-insensitive text comparison
  - Status: ✅ Active (used for email storage)

---

## 8. Email Subscription Security

### Endpoint: `/api/subscribe`

#### Security Features
1. **Email Validation**
   - Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - Prevents: Invalid email format, injection attacks

2. **Duplicate Prevention**
   - Query check before insert
   - Response: 409 Conflict if already subscribed

3. **Rate Limiting**
   - 5 requests per IP per hour
   - Response: 429 Too Many Requests

4. **Activity Tracking**
   - All actions logged to `subscription_activity`
   - Includes: IP address, user agent, timestamp

5. **IP Address Capture**
   - Header priority: `x-forwarded-for` > `x-real-ip` > `unknown`
   - Used for: Rate limiting, abuse detection

#### Response Headers
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
Content-Type: application/json
```

#### Status Codes
- **201 Created**: Successful subscription
- **400 Bad Request**: Invalid email format
- **409 Conflict**: Email already subscribed
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Database/system error

---

## 9. Monitoring & Alerts

### Key Metrics to Monitor

#### Database Health
```sql
-- Check latest health status
SELECT status, metadata, check_timestamp
FROM database_health_checks
ORDER BY check_timestamp DESC
LIMIT 5;
```

#### Activity Trends
```sql
-- Subscriptions per day
SELECT DATE(created_at) as date, COUNT(*) as count
FROM subscribers
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

#### Rate Limit Activity
```sql
-- Current rate limit violations
SELECT ip_address, COUNT(*) as violations
FROM api_rate_limits
WHERE window_end > now()
  AND requests_count > 5
GROUP BY ip_address;
```

#### System Health
```sql
-- Keep-alive job execution
SELECT * FROM database_health_checks
WHERE status = 'healthy'
ORDER BY check_timestamp DESC
LIMIT 1;
```

### Potential Alerts

1. **No Health Check (>30 minutes)**
   - Indicates keep-alive job failure
   - Action: Check pg_cron logs

2. **High Rate Limit Activity**
   - Indicates potential DDoS or bot activity
   - Action: Review IPs, block if necessary

3. **Database Pause Warning**
   - If no keep-alive for 24 hours
   - Action: Manually trigger `database_keep_alive()`

4. **Activity Spike**
   - Unusual subscriber growth or requests
   - Action: Verify legitimacy, adjust limits if needed

---

## 10. Production Checklist

- ✅ Keep-alive jobs scheduled (every 15 min + hourly)
- ✅ RLS enabled on all security tables
- ✅ Rate limiting configured (5 req/hour per IP)
- ✅ Activity logging implemented
- ✅ Data retention policies defined
- ✅ Security extensions installed (7 total)
- ✅ Backup tables created for audit
- ✅ Email validation with regex
- ✅ Duplicate subscriber prevention
- ✅ IP tracking for abuse detection

---

## 11. Deployment Status

| Component | Status | Notes |
|-----------|--------|-------|
| Keep-Alive Jobs | ✅ Active | pg_cron running |
| Rate Limiting | ✅ Active | 5 req/hour/IP |
| Activity Logging | ✅ Active | All actions tracked |
| RLS Policies | ✅ Complete | 6 security tables |
| Email Validation | ✅ Active | Regex + duplicate check |
| Data Retention | ✅ Configured | 90/180 day policies |
| Audit Logging | ✅ Active | pgaudit enabled |
| API Response Headers | ✅ Active | X-RateLimit headers |

---

## 12. Next Steps & Future Enhancements

### Immediate (Production Ready)
- Monitor keep-alive job execution
- Track subscription activity trends
- Review rate limit patterns

### Short Term (1-2 weeks)
- Set up monitoring dashboard
- Configure email alerts for anomalies
- Implement automated IP blocking for extreme violations

### Medium Term (1 month)
- Add webhook notifications for subscriber milestones
- Implement advanced analytics (geographic distribution, etc.)
- Set up automated backup verification

### Long Term (Ongoing)
- Implement machine learning for anomaly detection
- Add compliance reporting (GDPR, CCPA)
- Enhance security with additional pgaudit rules

---

## Questions or Issues?

For database security concerns, check:
1. Health checks: `SELECT * FROM database_health_checks LIMIT 5;`
2. Rate limits: `SELECT * FROM api_rate_limits WHERE window_end > now();`
3. Activities: `SELECT * FROM subscription_activity ORDER BY created_at DESC LIMIT 10;`
4. Cron jobs: `SELECT * FROM cron.job;`

**Support Email**: support@desigamehub.com
