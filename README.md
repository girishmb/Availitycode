# Availity Login Page

A modern, responsive login page built with HTML, CSS, and JavaScript for the Availity platform.

## Features

- **Modern Design**: Clean, professional UI with gradient backgrounds and glassmorphism effects
- **Responsive Layout**: Fully responsive design that works on all devices
- **Form Validation**: Real-time client-side validation with user-friendly error messages
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Social Login**: Integration ready for Google and Microsoft OAuth
- **Remember Me**: Local storage integration for user convenience
- **Password Toggle**: Show/hide password functionality
- **Loading States**: Visual feedback during form submission
- **Demo Credentials**: Built-in test accounts for demonstration

## Demo Credentials

For testing purposes, you can use these demo accounts:

- **Admin**: `admin@availity.com` / `password123`
- **User**: `user@availity.com` / `userpass123`
- **Demo**: `demo@availity.com` / `demo123456`

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for development server)

### Installation

1. Clone or download the project files
2. Open `login.html` directly in your browser, or
3. Use a development server for better experience:

```bash
# Using Node.js http-server
npm install
npm start

# Or using Python
python -m http.server 3000

# Or using Live Server extension in VS Code
```

### File Structure

```
├── login.html          # Main HTML file
├── login.css           # Stylesheet with responsive design
├── login.js            # JavaScript functionality
├── package.json        # Node.js dependencies (optional)
└── README.md           # This file
```

## Features Overview

### Design Elements
- Gradient background with glassmorphism card
- Inter font family for modern typography
- Font Awesome icons for visual enhancement
- Smooth animations and transitions
- Mobile-first responsive design

### Functionality
- Email and password validation
- Form submission with loading states
- Password visibility toggle
- Remember me functionality
- Forgot password handling
- Social login buttons (Google/Microsoft)
- Success/error modal dialogs
- Keyboard navigation support

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Customization

### Colors
The color scheme can be customized by modifying CSS custom properties:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #10b981;
  --error-color: #ef4444;
}
```

### Branding
- Replace the heartbeat icon with your company logo
- Update the "Availity" text with your brand name
- Modify footer links to match your company policies

## Security Considerations

This is a frontend-only implementation. For production use:

- Implement proper backend authentication
- Use HTTPS for all communications
- Add CSRF protection
- Implement rate limiting
- Use secure session management
- Validate all inputs server-side

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
