import { environment } from '../../environments/environment';

export class ApiUrls {
  public static baseUrl: string = environment.baseUrl;

  // 🎵 Songs
  public static songs: string = ApiUrls.baseUrl + 'Songs';
  public static songById = (id: number | string) => `${ApiUrls.songs}/${id}`;

  // 📜 Repertoires
  public static repertoires: string = ApiUrls.baseUrl + 'Repertoires';
  public static repertoireById = (id: number | string) => `${ApiUrls.repertoires}/${id}`;

  // 🔗 RepertoireSongs
  public static repertoireSongs: string = ApiUrls.baseUrl + 'RepertoireSongs';
  public static repertoireSongById = (id: number | string) => `${ApiUrls.repertoireSongs}/${id}`;

  // 👤 Users
  public static users: string = ApiUrls.baseUrl + 'Users';
  public static userById = (id: number | string) => `${ApiUrls.users}/${id}`;

  // 🩺 Health check (optional)
  public static health: string = ApiUrls.baseUrl + 'health';
}
