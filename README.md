# URL Shortener Service

This is a URL shortener service developed using Next.js. It allows users to enter a URL and obtain a shortened version. The shortened URL can be used in a browser to access the original document after redirection.

## Features

- URL Shortening: Users can enter a URL and receive a shortened version of the URL.
- Redirection: When the shortened URL is used as an address in a browser, the service redirects to the original document.
- Statistics Tracking: The service keeps track of various statistics for each shortened URL, including the number of times the URL was shortened and the number of times the shortened URL was accessed.
- Public Statistics: The statistics for each shortened URL are accessible to anyone.

## Setup Instructions

To set up the URL shortener service, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/lordmallam/url-shortener.git
   ```

2. Navigate to the project directory:
   ```
   cd url-shortener
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and access the URL: `http://localhost:3000`

## Usage

1. Enter a URL: On the home page of the URL shortener service, enter a URL in the input field.
2. Generate Shortened URL: Click on the "Generate" button to generate a shortened version of the URL.
3. Access Original Document: Use the shortened URL as an address in a browser to be redirected to the original document.
4. View Statistics: The statistics for each shortened URL are automatically displayed after shortening. You can also access the statistics for any shortened URL.

## Technology Stack

The URL shortener service is built using the following technologies:

- Next.js: A React framework for server-side rendering and building web applications.
- TypeScript: A statically typed superset of JavaScript for enhanced development.
- Express.js: A web application framework for handling server-side routing and middleware.
- File DB: A JSON file is used as a database for storing URL information and statistics for simplicity.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify it for your own purposes.

## Author

This URL shortener service is developed and maintained by [Your Name](https://github.com/lordmallam.

For any inquiries, please contact me at your-email@example.com.