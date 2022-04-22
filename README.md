<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/zernonia/supadb">
    <img src="src/assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">SupaDB</h3>

  <p align="center">
    Connect and play with <strong><a href="https://supabase.io/">Supabase</a></strong> REST API / Graphql easily
    <br />
    Free • Open Source
    <br />
    <br />
    <a href="https://supadb.dev/">View Demo</a>
    ·
    <a href="https://github.com/zernonia/supadb/issues">Report Bug</a>
    ·
    <a href="https://github.com/zernonia/supadb/issues">Request Feature</a>
  </p>
</p>

![Supabase Schema](public/og.png)

## 🚀 Features

- 🤩 Free
- 🚀 Unlimited API Request
- 🎨 Alowed to use on other project

## 📇 About The Project

This is my **Supabase Bring the Func(🕺) Hackathon 2022** submission!

**SupaDB** allows user that wanted to play with Supabase REST API/Grahql easily without having to manually seed the database.

**SupaDB** also allows Frontend Developer that wanted to focus on design to easily fetch the data without worrying about CORS stuff.

## Architecture

### Insert/Update Data

1. CRON Job by GitHub action
2. Vercel Serverless to scrap data
3. Upsert data into Supabase Database

### Fetch Data

1. Create custom secret for every user

```sql
create or replace function generate_secret ()
  returns text
  language plpgsql
  as
  $$
    begin
      return substr(md5(random()::text), 0, 25);
    end;
  $$
```

2. Wrap the secret in JWT token, set as Authorization Key in header

3. RLS to verify secret token exist in request

```sql
create or replace function auth.verify() returns text as $$
  select coalesce(
    nullif(current_setting('request.jwt.claim.secret', true), ''),
    nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'secret'
  )::text

$$ language sql stable;
```

### Log Usage

In order to monitor the API usage, I created a temporary scripts to Insert Log data to a custom table

1. Create Foreign Data Wrapper sing `file_fdw` [(GitHub discussion)](https://github.com/supabase/supabase/discussions/479)

```sql
CREATE EXTENSION file_fdw;

CREATE SERVER logserver FOREIGN DATA WRAPPER file_fdw;

CREATE FOREIGN TABLE pglog (
  log_time timestamp(3) with time zone,
  user_name text,
  database_name text,
  process_id integer,
  connection_from text,
  session_id text,
  session_line_num bigint,
  command_tag text,
  session_start_time timestamp with time zone,
  virtual_transaction_id text,
  transaction_id bigint,
  error_severity text,
  sql_state_code text,
  message text,
  detail text,
  hint text,
  internal_query text,
  internal_query_pos integer,
  context text,
  query text,
  query_pos integer,
  location text,
  application_name text,
  backend_type text,
  leader_pid integer,
  query_id bigint
) SERVER logserver
OPTIONS ( filename '/var/log/postgresql/postgresql.csv', format 'csv' );
```

2. Query data from `pglog` foreign table created in step 1.

```sql
select * from
  (select
    concat(session_id, process_id, virtual_transaction_id) as id,
    btrim(split_part(detail, ', ', 8), '$6= ''""')::json ->> 'secret' as secret,
    btrim(split_part(detail, ', ', 12), '$10= /''' ) as table,
    log_time as created_at
  from pglog where command_tag ~ 'SELECT' and message ~* 'execute 1'
  ) as T
  where T.table <> 'buckets'
```

3. Setup CRON job to insert above query to table

```sql
select
  cron.schedule(
    'save-logfile', -- name of the cron job
    '*/3 * * * *', -- every 3 minutes
    $$
    insert into history (id, secret, ref, created_at)
      (/* step 2 */)
    on conflict (id)
    do nothing;
    $$
  );
```

4. Create view for easy monitor

```sql
create or replace view api_history
  as select u.id as id, count(*) as count from
    (select h.*, s.user_id from public.history h
      left join public.secrets s on h.secret = s.secret
      where h.secret is not null and h.created_at >= now() - interval '1 day'
    ) a
  left join auth.users u on a.user_id = u.id
  group by u.id
```

### 🔨 Built With

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [WindiCSS](https://windicss.org/)

## 🌎 Local Development

### Prerequisites

Yarn

- ```sh
  npm install --global yarn vercel
  ```

### Development

1. Clone the repo
   ```sh
   git clone https://github.com/zernonia/supadb.git
   ```
2. Install NPM packages
   ```sh
   cd supadb
   yarn install
   ```
3. Run local Vercel development instance
   ```sh
   vercel dev
   ```

## ➕ Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Not Associated with Supabase.

Distributed under the MIT License. See `LICENSE` for more information.

# 📧 Contact

Zernonia - [@zernonia](https://twitter.com/zernonia) - zernonia@gmail.com

Also, if you like my work, please buy me a coffee ☕😳

<a href="https://www.buymeacoffee.com/zernonia" target="_blank">
    <img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Logo" >
  </a>
