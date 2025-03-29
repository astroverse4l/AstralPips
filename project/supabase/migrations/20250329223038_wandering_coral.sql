/*
  # Initial Schema Setup for Astral Pips Institute

  1. New Tables
    - users_profile (extends auth.users)
      - user_id (uuid, primary key)
      - display_name (text)
      - avatar_url (text)
      - experience_level (text)
      - created_at (timestamptz)
      - last_active (timestamptz)
    
    - courses
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - category (text)
      - difficulty (text)
      - estimated_hours (int)
      - created_at (timestamptz)
      
    - lessons
      - id (uuid, primary key)
      - course_id (uuid, foreign key)
      - title (text)
      - content (text)
      - duration_minutes (int)
      - order_index (int)
      - created_at (timestamptz)
    
    - user_progress
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - lesson_id (uuid, foreign key)
      - completed_at (timestamptz)
      - score (int)
      
    - forum_posts
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - title (text)
      - content (text)
      - category (text)
      - created_at (timestamptz)
      
    - forum_comments
      - id (uuid, primary key)
      - post_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - content (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
    - Add policies for admin access
*/

-- Create users_profile table
CREATE TABLE users_profile (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  experience_level TEXT DEFAULT 'beginner',
  created_at TIMESTAMPTZ DEFAULT now(),
  last_active TIMESTAMPTZ DEFAULT now()
);

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  estimated_hours INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  score INTEGER DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

-- Create forum_posts table
CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create forum_comments table
CREATE TABLE forum_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own profile"
  ON users_profile FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON users_profile FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can track their own progress"
  ON user_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read forum posts"
  ON forum_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create forum posts"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own forum posts"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read forum comments"
  ON forum_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create forum comments"
  ON forum_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own forum comments"
  ON forum_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);