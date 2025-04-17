create table "user" ("id" text not null primary key, "name" text not null, "email" text not null unique, "emailVerified" boolean not null, "image" text, "createdAt" timestamp not null, "updatedAt" timestamp not null);

create table "session" ("id" text not null primary key, "expiresAt" timestamp not null, "token" text not null unique, "createdAt" timestamp not null, "updatedAt" timestamp not null, "ipAddress" text, "userAgent" text, "userId" text not null references "user" ("id"));

create table "account" ("id" text not null primary key, "accountId" text not null, "providerId" text not null, "userId" text not null references "user" ("id"), "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" timestamp, "refreshTokenExpiresAt" timestamp, "scope" text, "password" text, "createdAt" timestamp not null, "updatedAt" timestamp not null);

create table "verification" ("id" text not null primary key, "identifier" text not null, "value" text not null, "expiresAt" timestamp not null, "createdAt" timestamp, "updatedAt" timestamp);

-- Tables pour les équipes
create table "team" (
    "id" text not null primary key,
    "name" text not null,
    "createdAt" timestamp not null,
    "updatedAt" timestamp not null
);

create table "team_member" (
    "id" text not null primary key,
    "teamId" text not null references "team" ("id") on delete cascade,
    "userId" text not null references "user" ("id") on delete cascade,
    "role" text not null default 'member',
    "createdAt" timestamp not null,
    "updatedAt" timestamp not null,
    unique("teamId", "userId")
);

create table "team_invitation" (
    "id" text not null primary key,
    "teamId" text not null references "team" ("id") on delete cascade,
    "email" text not null,
    "token" text not null unique,
    "expiresAt" timestamp not null,
    "createdAt" timestamp not null,
    unique("teamId", "email")
);

-- Indexes pour les équipes
create index "idx_team_member_team_id" on "team_member"("teamId");
create index "idx_team_member_user_id" on "team_member"("userId");
create index "idx_team_invitation_team_id" on "team_invitation"("teamId");
create index "idx_team_invitation_token" on "team_invitation"("token");

-- Tables pour les recettes
create table "recipe" (
    "id" text not null primary key,
    "title" text not null,
    "description" text,
    "ingredients" text[] not null,
    "instructions" text[] not null,
    "imageUrl" text,
    "teamId" text not null references "team" ("id") on delete cascade,
    "createdBy" text not null references "user" ("id") on delete cascade,
    "createdAt" timestamp not null,
    "updatedAt" timestamp not null
);

-- Indexes pour les recettes
create index "idx_recipe_team_id" on "recipe"("teamId");
create index "idx_recipe_created_by" on "recipe"("createdBy");