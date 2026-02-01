import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { authService } from '../services/authService'

export function useAuth() {
  const navigate = useNavigate()
  const { user, profile, isAuthenticated, setUser, setProfile, logout } = useAuthStore()

  useEffect(() => {
    // Check active session
    authService.getCurrentUser().then((data) => {
      if (data?.user && data?.profile) {
        setUser(data.user)
        setProfile(data.profile)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const profile = await authService.getProfile(session.user.id)
          setUser(session.user)
          setProfile(profile)
        } else if (event === 'SIGNED_OUT') {
          logout()
          navigate('/login')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signIn = async (email: string, password: string) => {
    const { user, profile } = await authService.signIn(email, password)
    setUser(user)
    setProfile(profile)
    navigate('/')
  }

  const signOut = async () => {
    await authService.signOut()
    logout()
    navigate('/login')
  }

  return {
    user,
    profile,
    isAuthenticated,
    signIn,
    signOut,
  }
}
