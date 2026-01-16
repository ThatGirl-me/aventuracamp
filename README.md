# Aventura Website

A modern, professional website for Aventura - an AI-powered interactive fiction platform. Built with Astro and PHP for optimal performance and dynamic GitHub integration.

## Overview

This website showcases Aventura's powerful features for creating immersive interactive fiction stories with AI integration, memory systems, and advanced storytelling capabilities. The site combines static site generation with dynamic PHP backend for the best of both worlds.

### Key Features

- **Modern Design**: Clean, professional aesthetic with sophisticated color palette
- **Hybrid Stack**: Astro for static pages + PHP for dynamic GitHub integration
- **Responsive**: Mobile-first design that works beautifully on all devices
- **Fast Performance**: Optimized static HTML with minimal JavaScript
- **GitHub Integration**: Automatically fetches and displays latest release versions
- **Accessible**: WCAG AA compliant with semantic HTML and proper ARIA labels
- **SEO Optimized**: Proper meta tags and structured markup for search engines

## Project Structure

```
aventura-website/
├── website/                   # Production-ready website files
│   ├── _astro/               # Built CSS and assets
│   ├── components/           # PHP components for dynamic features
│   │   ├── header.php
│   │   ├── footer.php
│   │   ├── nav.php
│   │   ├── download-btn.php
│   │   └── ...
│   ├── config/               # Configuration files
│   │   ├── config.php
│   │   └── constants.php
│   ├── services/             # Business logic
│   │   ├── GitHubService.php
│   │   ├── ReleaseCache.php
│   │   └── VersionManager.php
│   ├── templates/            # PHP page templates
│   │   ├── base.php
│   │   ├── home.php
│   │   ├── features.php
│   │   └── ...
│   ├── cache/                # Cached release data (auto-created)
│   ├── docs/                 # Built documentation page
│   ├── features/             # Built features page
│   ├── setup/                # Built setup page
│   ├── index.html            # Built homepage
│   ├── index.php             # PHP router/entry point
│   ├── .htaccess             # Apache URL rewriting
│   ├── logo.png              # Static assets
│   └── README.md             # Deployment documentation
├── .git/                      # Git repository
└── README.md                  # This file
```

## Deployment

The `website/` folder contains the complete production-ready website. Simply upload the contents of this folder to your web hosting.

### Prerequisites

- PHP 7.4 or higher
- Apache or Nginx web server
- Write permissions for the `cache/` directory

### Deployment Steps

1. **Upload the website folder**
   ```bash
   # Upload all files from the website/ directory to your web hosting
   scp -r website/* user@yourserver:/var/www/html/
   ```

2. **Set permissions**
   ```bash
   chmod 755 website/cache/
   chmod 644 website/.htaccess
   ```

3. **Configure web server**
   
   **Apache (with mod_rewrite):**
   - The `.htaccess` file is already configured
   - Ensure `mod_rewrite` is enabled: `sudo a2enmod rewrite`
   - Point your document root to the website directory
   
   **Nginx:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html/website;
       index index.html index.php;

       location / {
           try_files $uri $uri/ /index.php?$query_string;
       }

       location ~ \.php$ {
           fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
           fastcgi_index index.php;
           fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
           include fastcgi_params;
       }
   }
   ```

4. **Test the deployment**
   - Visit your domain and verify all pages load correctly
   - Check that download buttons show the latest version
   - Test responsive design on mobile devices

## Configuration

All configuration is located in the `website/config/` directory.

### Site Configuration (`website/config/constants.php`)

```php
// Site Information
define('SITE_NAME', 'Aventura');
define('SITE_TITLE', 'Aventura - AI-Powered Interactive Fiction');
define('SITE_DESCRIPTION', 'Your site description');
define('SITE_URL', 'https://aventura.ai');

// GitHub Repository
define('GITHUB_REPO', 'https://github.com/unkarelian/Aventura');
define('GITHUB_RELEASES_API', 'https://api.github.com/repos/unkarelian/Aventura/releases/latest');

// Social Links
define('SOCIAL_GITHUB', 'https://github.com/unkarelian/Aventura');
define('SOCIAL_DISCORD', 'https://discord.gg/aventura');
```

### Color Scheme (`config/constants.php`)

```php
// Brand Colors
define('COLOR_PRIMARY_BLUE', '#2f5377');   // Logo blue - primary brand color
define('COLOR_ACCENT_RED', '#fe554b');     // Mascot red-orange - CTAs and highlights
define('COLOR_BG_DARK', '#221810');        // Primary background
define('COLOR_SURFACE_DARK', '#332419');   // Card backgrounds
define('COLOR_BORDER_BROWN', '#483323');   // Borders and dividers
define('COLOR_TEXT_CREAM', '#f3ece4');     // Primary text
define('COLOR_TEXT_MUTED', '#c9a992');     // Secondary text
```

### Cache Configuration (`website/config/config.php`)

```php
// Cache Settings
define('CACHE_DIR', __DIR__ . '/../cache');
define('CACHE_DURATION', 3600); // 1 hour in seconds

// GitHub API Settings
define('GITHUB_API_TIMEOUT', 10); // seconds
define('GITHUB_API_RETRIES', 3);
```

### Environment Variables

Set the `ENVIRONMENT` variable to control debug mode:

```bash
# Development (shows errors)
export ENVIRONMENT=development

# Production (logs errors)
export ENVIRONMENT=production
```

## Deployment Instructions

### Standard Web Hosting

1. **Upload files**
   - Upload all files from the `website/` directory to your web hosting via FTP/SFTP
   - Ensure the document root points to the uploaded directory

2. **Set permissions**
   ```bash
   chmod 755 cache/
   chmod 644 .htaccess
   ```

3. **Configure environment**
   - Set `ENVIRONMENT=production` in your hosting control panel
   - Or add to `.htaccess`:
     ```apache
     SetEnv ENVIRONMENT production
     ```

4. **Verify PHP version**
   - Ensure PHP 7.4+ is enabled
   - Enable `mod_rewrite` for Apache

5. **Test the site**
   - Visit your domain and verify all pages load correctly
   - Check that download buttons show the latest version
   - Test responsive design on mobile devices

### Apache Configuration

The `.htaccess` file handles URL rewriting:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]
```

### Nginx Configuration

For Nginx, add this to your server block:

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
}
```

### Performance Optimization

1. **Enable Gzip compression** (Apache):
   ```apache
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
   </IfModule>
   ```

2. **Enable browser caching** (Apache):
   ```apache
   <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType text/css "access plus 1 year"
       ExpiresByType application/javascript "access plus 1 year"
       ExpiresByType image/png "access plus 1 year"
   </IfModule>
   ```

### SSL/HTTPS

1. **Obtain SSL certificate**
   - Use Let's Encrypt for free SSL: `certbot --apache`
   - Or use your hosting provider's SSL certificate

2. **Force HTTPS** (add to `.htaccess`):
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Monitoring

- **Check cache directory**: Ensure `cache/github_release.json` is being created
- **Monitor error logs**: Check PHP error logs for any issues
- **Test GitHub integration**: Verify download buttons show correct versions

## GitHub Integration

The site automatically fetches the latest release information from GitHub. The static HTML pages are enhanced with PHP components that provide dynamic download links.

### How It Works

1. **Static pages**: Built with Astro for optimal performance
2. **Dynamic components**: PHP components fetch latest release data
3. **Caching**: Release data is cached for 1 hour to minimize API calls
4. **Fallback**: Uses cached data if API call fails

### Cache Management

- **Location**: `website/cache/github_release.json`
- **Duration**: 1 hour (configurable in `website/config/config.php`)
- **Manual refresh**: Delete cache file to force immediate update

## Testing

### Manual Testing

1. **Test all pages**: Visit /, /features, /setup, /docs
2. **Test responsive design**: Resize browser or use device emulator
3. **Test navigation**: Click all menu items and verify active states
4. **Test download buttons**: Verify they link to correct GitHub releases
5. **Test mobile menu**: Verify hamburger menu works on mobile

## Troubleshooting

### Common Issues

**Problem**: Pages show 404 errors
- **Solution**: Ensure `mod_rewrite` is enabled (Apache) or Nginx is configured correctly

**Problem**: Download buttons show "Version unavailable"
- **Solution**: Check cache directory permissions, verify GitHub API is accessible

**Problem**: Cache not updating
- **Solution**: Delete `website/cache/github_release.json` and reload page

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is part of the Aventura ecosystem. See the main [Aventura repository](https://github.com/unkarelian/Aventura) for license information.

## Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/unkarelian/Aventura/issues)
- **Discord**: Join our community
- **Documentation**: Visit the /docs page for more information

## Credits

Built with ❤️ for the Aventura community.

---

**Ready to deploy**: The `website/` folder contains everything you need for production deployment.
