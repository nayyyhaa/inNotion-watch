import { BiHome, BiTrendingUp, BiLike } from "react-icons/bi";
import { MdPlaylistPlay, MdWatchLater, MdHistory } from "react-icons/md";

export const sidebarData = [
  { _id: 1, title: "Home", link: "/", icon: BiHome },
  { _id: 2, title: "Trending", link: "/trending-feed", icon: BiTrendingUp },
  { _id: 3, title: "Liked", link: "/liked-feed", icon: BiLike },
  { _id: 4, title: "Playlist", link: "/playlist-feed", icon: MdPlaylistPlay },
  { _id: 5, title: "Watch Later", link: "/watch-later-feed", icon: MdWatchLater },
  { _id: 6, title: "History", link: "/history-feed", icon: MdHistory },
];
