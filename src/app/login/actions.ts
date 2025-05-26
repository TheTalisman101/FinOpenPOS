'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { type RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  // Get cookies within the server action scope
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function signup(formData: FormData) {
  // Get cookies within the server action scope
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function generateExampleData(user_uid: string) {
  // Get cookies within the server action scope
  const supabase = createClient()
}