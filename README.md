# CodeNova - Professional Portfolio Website

A modern, responsive portfolio website for CodeNova software development agency built with React, Express.js, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Dark galaxy/nebula theme with neon gradient highlights
- **Responsive Layout**: Mobile-first design that works on all devices
- **Advanced Animations**: Smooth transitions and scroll-triggered animations using Framer Motion
- **Interactive Components**: Hero section with particle animation, testimonials carousel, portfolio filtering
- **Contact Form**: Working contact form with Express.js backend integration
- **Floating Contact**: WhatsApp/Chat floating button for instant contact
- **Professional Content**: Complete pages for About, Services, Portfolio, and Contact

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** with custom theme
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **CORS** for cross-origin requests
- **Helmet** for security
- **Nodemon** for development

## 📁 Project Structure

```
CodeNova/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   ├── tailwind.config.js   # Tailwind configuration
│   └── vite.config.js       # Vite configuration
├── backend/                 # Express backend
│   ├── server.js           # Main server file
│   └── package.json
├── package.json             # Root package.json
└── README.md
```

## 🎨 Design Features

- **Color Scheme**: Custom Nova theme with dark backgrounds and neon accents
- **Typography**: Inter font family with clear hierarchy
- **Animations**: Framer Motion animations throughout
- **Glass Effects**: Modern glassmorphism design elements
- **Gradients**: Beautiful gradient backgrounds and text effects
- **Hover Effects**: Interactive hover states and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CodeNova
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:5173) and backend (http://localhost:5000) servers concurrently.

### Individual Commands

- **Frontend only**: `npm run client`
- **Backend only**: `npm run server`
- **Build frontend**: `npm run build`

## 📱 Pages & Components

### Pages
- **Home**: Hero section, services overview, portfolio highlights, testimonials
- **About**: Company mission, values, team, and statistics
- **Services**: Detailed service offerings (MERN, Cloud, Mobile, Video Editing)
- **Portfolio**: Project showcase with filtering capabilities
- **Contact**: Contact form with backend integration

### Key Components
- **Navbar**: Responsive navigation with mobile menu
- **Hero**: Animated background with particle effects
- **Services**: Service cards with hover animations
- **Portfolio**: Project cards with filtering
- **Testimonials**: Auto-sliding carousel
- **Contact Form**: Working form with success/error states
- **Footer**: Comprehensive footer with links and social media
- **FloatingContact**: WhatsApp/Chat floating button

## 🎯 API Endpoints

### Backend Routes
- `GET /api/health` - Health check endpoint
- `POST /api/contact` - Contact form submission

### Contact Form Data
```json
{
  "name": "string",
  "email": "string", 
  "message": "string",
  "projectDetails": "string"
}
```

## 🎨 Customization

### Colors
The project uses custom Tailwind colors defined in `tailwind.config.js`:
- `nova-dark`: #0a0a0f
- `nova-blue`: #00d4ff
- `nova-purple`: #8b5cf6
- `nova-pink`: #ec4899

### Animations
All animations are built with Framer Motion and can be customized in individual components.

## 📦 Build & Deployment

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Deploy the backend**
   ```bash
   cd backend
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, contact us at:
- Email: usmanhaiderkhokhar715@gmail.com
- Phone: +92 319 7331383
- WhatsApp: +92 319 7331383

---

**CodeNova** - Igniting Ideas. Building Futures. 🚀
