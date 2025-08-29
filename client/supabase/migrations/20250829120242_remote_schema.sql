drop extension if exists "pg_net";


  create table "public"."employer_experience" (
    "id" character varying not null,
    "name" character varying not null
      );


alter table "public"."employer_experience" enable row level security;


  create table "public"."skill" (
    "id" character varying not null,
    "last_updated_at" timestamp with time zone not null default now(),
    "category_id" character varying not null default '1'::character varying,
    "subcategory_id" character varying,
    "name" character varying,
    "comfort_level" smallint not null default '50'::smallint
      );


alter table "public"."skill" enable row level security;


  create table "public"."skill_category" (
    "id" character varying not null,
    "name" character varying not null
      );


alter table "public"."skill_category" enable row level security;


  create table "public"."skill_employer_experience" (
    "employer_experience_id" character varying not null,
    "skill_id" character varying not null
      );


alter table "public"."skill_employer_experience" enable row level security;


  create table "public"."skill_subcategory" (
    "id" character varying not null,
    "name" character varying not null
      );


alter table "public"."skill_subcategory" enable row level security;

CREATE UNIQUE INDEX employer_experience_name_key ON public.employer_experience USING btree (name);

CREATE UNIQUE INDEX employer_experience_pkey ON public.employer_experience USING btree (id);

CREATE UNIQUE INDEX skill_category_name_key ON public.skill_category USING btree (name);

CREATE UNIQUE INDEX skill_category_pkey ON public.skill_category USING btree (id);

CREATE UNIQUE INDEX skill_employer_experience_pkey ON public.skill_employer_experience USING btree (employer_experience_id, skill_id);

CREATE UNIQUE INDEX skill_name_key ON public.skill USING btree (name);

CREATE UNIQUE INDEX skill_pkey ON public.skill USING btree (id);

CREATE UNIQUE INDEX skill_subcategory_name_key ON public.skill_subcategory USING btree (name);

CREATE UNIQUE INDEX skill_subcategory_pkey ON public.skill_subcategory USING btree (id);

alter table "public"."employer_experience" add constraint "employer_experience_pkey" PRIMARY KEY using index "employer_experience_pkey";

alter table "public"."skill" add constraint "skill_pkey" PRIMARY KEY using index "skill_pkey";

alter table "public"."skill_category" add constraint "skill_category_pkey" PRIMARY KEY using index "skill_category_pkey";

alter table "public"."skill_employer_experience" add constraint "skill_employer_experience_pkey" PRIMARY KEY using index "skill_employer_experience_pkey";

alter table "public"."skill_subcategory" add constraint "skill_subcategory_pkey" PRIMARY KEY using index "skill_subcategory_pkey";

alter table "public"."employer_experience" add constraint "employer_experience_name_key" UNIQUE using index "employer_experience_name_key";

alter table "public"."skill" add constraint "skill_category_id_fkey" FOREIGN KEY (category_id) REFERENCES skill_category(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."skill" validate constraint "skill_category_id_fkey";

alter table "public"."skill" add constraint "skill_name_key" UNIQUE using index "skill_name_key";

alter table "public"."skill" add constraint "skill_subcategory_id_fkey" FOREIGN KEY (subcategory_id) REFERENCES skill_subcategory(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."skill" validate constraint "skill_subcategory_id_fkey";

alter table "public"."skill_category" add constraint "skill_category_name_key" UNIQUE using index "skill_category_name_key";

alter table "public"."skill_employer_experience" add constraint "skill_employer_experience_employer_experience_id_fkey" FOREIGN KEY (employer_experience_id) REFERENCES employer_experience(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."skill_employer_experience" validate constraint "skill_employer_experience_employer_experience_id_fkey";

alter table "public"."skill_employer_experience" add constraint "skill_employer_experience_skill_id_fkey" FOREIGN KEY (skill_id) REFERENCES skill(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."skill_employer_experience" validate constraint "skill_employer_experience_skill_id_fkey";

alter table "public"."skill_subcategory" add constraint "skill_subcategory_name_key" UNIQUE using index "skill_subcategory_name_key";

grant delete on table "public"."employer_experience" to "anon";

grant insert on table "public"."employer_experience" to "anon";

grant references on table "public"."employer_experience" to "anon";

grant select on table "public"."employer_experience" to "anon";

grant trigger on table "public"."employer_experience" to "anon";

grant truncate on table "public"."employer_experience" to "anon";

grant update on table "public"."employer_experience" to "anon";

grant delete on table "public"."employer_experience" to "authenticated";

grant insert on table "public"."employer_experience" to "authenticated";

grant references on table "public"."employer_experience" to "authenticated";

grant select on table "public"."employer_experience" to "authenticated";

grant trigger on table "public"."employer_experience" to "authenticated";

grant truncate on table "public"."employer_experience" to "authenticated";

grant update on table "public"."employer_experience" to "authenticated";

grant delete on table "public"."employer_experience" to "service_role";

grant insert on table "public"."employer_experience" to "service_role";

grant references on table "public"."employer_experience" to "service_role";

grant select on table "public"."employer_experience" to "service_role";

grant trigger on table "public"."employer_experience" to "service_role";

grant truncate on table "public"."employer_experience" to "service_role";

grant update on table "public"."employer_experience" to "service_role";

grant delete on table "public"."skill" to "anon";

grant insert on table "public"."skill" to "anon";

grant references on table "public"."skill" to "anon";

grant select on table "public"."skill" to "anon";

grant trigger on table "public"."skill" to "anon";

grant truncate on table "public"."skill" to "anon";

grant update on table "public"."skill" to "anon";

grant delete on table "public"."skill" to "authenticated";

grant insert on table "public"."skill" to "authenticated";

grant references on table "public"."skill" to "authenticated";

grant select on table "public"."skill" to "authenticated";

grant trigger on table "public"."skill" to "authenticated";

grant truncate on table "public"."skill" to "authenticated";

grant update on table "public"."skill" to "authenticated";

grant delete on table "public"."skill" to "service_role";

grant insert on table "public"."skill" to "service_role";

grant references on table "public"."skill" to "service_role";

grant select on table "public"."skill" to "service_role";

grant trigger on table "public"."skill" to "service_role";

grant truncate on table "public"."skill" to "service_role";

grant update on table "public"."skill" to "service_role";

grant delete on table "public"."skill_category" to "anon";

grant insert on table "public"."skill_category" to "anon";

grant references on table "public"."skill_category" to "anon";

grant select on table "public"."skill_category" to "anon";

grant trigger on table "public"."skill_category" to "anon";

grant truncate on table "public"."skill_category" to "anon";

grant update on table "public"."skill_category" to "anon";

grant delete on table "public"."skill_category" to "authenticated";

grant insert on table "public"."skill_category" to "authenticated";

grant references on table "public"."skill_category" to "authenticated";

grant select on table "public"."skill_category" to "authenticated";

grant trigger on table "public"."skill_category" to "authenticated";

grant truncate on table "public"."skill_category" to "authenticated";

grant update on table "public"."skill_category" to "authenticated";

grant delete on table "public"."skill_category" to "service_role";

grant insert on table "public"."skill_category" to "service_role";

grant references on table "public"."skill_category" to "service_role";

grant select on table "public"."skill_category" to "service_role";

grant trigger on table "public"."skill_category" to "service_role";

grant truncate on table "public"."skill_category" to "service_role";

grant update on table "public"."skill_category" to "service_role";

grant delete on table "public"."skill_employer_experience" to "anon";

grant insert on table "public"."skill_employer_experience" to "anon";

grant references on table "public"."skill_employer_experience" to "anon";

grant select on table "public"."skill_employer_experience" to "anon";

grant trigger on table "public"."skill_employer_experience" to "anon";

grant truncate on table "public"."skill_employer_experience" to "anon";

grant update on table "public"."skill_employer_experience" to "anon";

grant delete on table "public"."skill_employer_experience" to "authenticated";

grant insert on table "public"."skill_employer_experience" to "authenticated";

grant references on table "public"."skill_employer_experience" to "authenticated";

grant select on table "public"."skill_employer_experience" to "authenticated";

grant trigger on table "public"."skill_employer_experience" to "authenticated";

grant truncate on table "public"."skill_employer_experience" to "authenticated";

grant update on table "public"."skill_employer_experience" to "authenticated";

grant delete on table "public"."skill_employer_experience" to "service_role";

grant insert on table "public"."skill_employer_experience" to "service_role";

grant references on table "public"."skill_employer_experience" to "service_role";

grant select on table "public"."skill_employer_experience" to "service_role";

grant trigger on table "public"."skill_employer_experience" to "service_role";

grant truncate on table "public"."skill_employer_experience" to "service_role";

grant update on table "public"."skill_employer_experience" to "service_role";

grant delete on table "public"."skill_subcategory" to "anon";

grant insert on table "public"."skill_subcategory" to "anon";

grant references on table "public"."skill_subcategory" to "anon";

grant select on table "public"."skill_subcategory" to "anon";

grant trigger on table "public"."skill_subcategory" to "anon";

grant truncate on table "public"."skill_subcategory" to "anon";

grant update on table "public"."skill_subcategory" to "anon";

grant delete on table "public"."skill_subcategory" to "authenticated";

grant insert on table "public"."skill_subcategory" to "authenticated";

grant references on table "public"."skill_subcategory" to "authenticated";

grant select on table "public"."skill_subcategory" to "authenticated";

grant trigger on table "public"."skill_subcategory" to "authenticated";

grant truncate on table "public"."skill_subcategory" to "authenticated";

grant update on table "public"."skill_subcategory" to "authenticated";

grant delete on table "public"."skill_subcategory" to "service_role";

grant insert on table "public"."skill_subcategory" to "service_role";

grant references on table "public"."skill_subcategory" to "service_role";

grant select on table "public"."skill_subcategory" to "service_role";

grant trigger on table "public"."skill_subcategory" to "service_role";

grant truncate on table "public"."skill_subcategory" to "service_role";

grant update on table "public"."skill_subcategory" to "service_role";


  create policy "Enable delete for authenticated users only"
  on "public"."employer_experience"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."employer_experience"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all users"
  on "public"."employer_experience"
  as permissive
  for select
  to public
using (true);



  create policy "Enable update for authenticated users only"
  on "public"."employer_experience"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "Enable delete for authenticated users only"
  on "public"."skill"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."skill"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all users"
  on "public"."skill"
  as permissive
  for select
  to public
using (true);



  create policy "Enable update for authenticated users only"
  on "public"."skill"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "Enable delete for authenticated users only"
  on "public"."skill_category"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."skill_category"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all users"
  on "public"."skill_category"
  as permissive
  for select
  to public
using (true);



  create policy "Enable update for authenticated users only"
  on "public"."skill_category"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "Enable delete for authenticated users only"
  on "public"."skill_employer_experience"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."skill_employer_experience"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all users"
  on "public"."skill_employer_experience"
  as permissive
  for select
  to public
using (true);



  create policy "Enable update for authenticated users only"
  on "public"."skill_employer_experience"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "Enable delete for authenticated users only"
  on "public"."skill_subcategory"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."skill_subcategory"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all users"
  on "public"."skill_subcategory"
  as permissive
  for select
  to public
using (true);



  create policy "Enable update for authenticated users only"
  on "public"."skill_subcategory"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



