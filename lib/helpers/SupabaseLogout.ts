import { Supabase } from '../client/supabase.pub';
import CallNoti from './NotiCaller';

const SupabaseLogout = async () => {
  try {
    const { error } = await Supabase.auth.signOut();
    if (error) throw error;
    CallNoti('Done', 'Logged out');
  } catch (error: any) {
    CallNoti('Error', error.error_description || error.message);
  }
};

export default SupabaseLogout;
