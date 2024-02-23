const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION;

let baseUrl: string;

if (isProduction) {
  // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  baseUrl = '/api';
} else {
  baseUrl = 'http://localhost:3000/api';
}

export default baseUrl;