import { Database } from '@/lib/schema';

export type TProfile = Database['public']['Tables']['profiles']['Row'];
export type TWishlist = Database['public']['Tables']['wishlists']['Row'];
export type TWishlistItem = Database['public']['Tables']['items']['Row'];
export type TShop = Database['public']['Tables']['shops']['Row'];
export type TFriendship = Database['public']['Tables']['friendships']['Row'];
export type TSharedWishlist = Database['public']['Tables']['shared_wishlists']['Row'];

export interface ISharedWishlistJoinProfile extends TSharedWishlist {
  friendship: TFriendship;
}
