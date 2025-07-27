# Doctor Clinic PWA

A Progressive Web App for medical clinics, providing an easy way for patients to view doctor information and book appointments. This application is designed to work with any medical practitioner and can be easily customized for different specializations.

## 🩺 Doctor Profile System

The app supports comprehensive doctor profiles including:
- **Qualifications** - Educational background and certifications
- **Specializations** - Areas of medical expertise
- **Experience** - Years of practice and patient statistics
- **Contact Information** - Multiple communication channels
- **Availability** - Appointment scheduling and time slots

## ✨ Features

- 📱 **Progressive Web App** - Installable on mobile and desktop
- 🏥 **Dynamic Doctor Profiles** - Configurable doctor information and specializations
- 📅 **Smart Appointment Booking** - Token-based scheduling with time slot management
- 🔄 **Multi-Step Booking Flow** - Patient information → Date/Time selection → Token generation
- 📞 **Direct Contact Integration** - Call and message functionality
- ⭐ **Rating & Review System** - Patient feedback and ratings display
- 📊 **Analytics Dashboard** - Patient statistics, booking counts, and performance metrics
- 🎨 **Responsive Design** - Optimized for all devices and screen sizes
- 🌙 **Dark Mode Support** - Automatic theme switching based on user preference
- 🏗️ **Widget Architecture** - Modular, reusable components for easy customization
- 🔌 **API-Ready Backend** - Service-oriented architecture ready for backend integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd doctor-clinic-pwa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 PWA Features

- **Offline Functionality** - Works without internet connection
- **Install Prompt** - Can be installed on devices like a native app
- **Service Worker** - Automatic updates and caching
- **App-like Experience** - Full-screen mode on mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern functional components with hooks
- **Vite** - Fast build tool and development server
- **PWA Plugin** - Progressive Web App functionality
- **CSS3** - Responsive styling with animations and transitions
- **Service Worker** - Offline functionality and caching

### Architecture
- **Widget-Based Components** - Modular, reusable UI components
- **Service Layer** - Abstracted API communication layer
- **Mock Data Services** - Ready for backend integration
- **HTTP Client** - Centralized request handling

### Services Included
- **Doctor Service** - Profile management and information retrieval
- **Patient Service** - Patient information handling and validation
- **Token Service** - Appointment token generation and time slot management
- **HTTP Client** - Base service for all API communications

## 🏗️ Architecture Overview

### Component Structure
```
src/
├── components/           # Main application components
│   ├── DoctorProfile.jsx    # Main profile container
│   └── AppointmentModal.jsx # Multi-step booking flow
├── widgets/             # Reusable widget components
│   ├── DoctorHeader.jsx     # Doctor name and photo
│   ├── ContactActions.jsx   # Call/message buttons
│   ├── DoctorStats.jsx      # Experience and ratings
│   ├── DoctorDetails.jsx    # Qualifications and bio
│   ├── AppointmentButton.jsx # Booking trigger
│   ├── PatientInfoForm.jsx  # Patient details form
│   └── DateTimeSelector.jsx # Time slot selection
├── services/            # API service layer
│   ├── httpClient.js        # Base HTTP client
│   ├── doctorService.js     # Doctor data management
│   ├── patientService.js    # Patient operations
│   └── tokenService.js      # Appointment scheduling
└── assets/             # Static resources
```

### Data Flow
1. **Widget Components** fetch data from **Services**
2. **Services** use **HTTP Client** for API communication
3. **Mock implementations** simulate backend responses
4. **Easy backend integration** by updating service endpoints

## 🔌 Backend Integration

The application is designed with a service-oriented architecture that makes backend integration straightforward:

### Current Mock Services
- All services include realistic delays and response simulation
- Error handling and loading states implemented
- Data validation and sanitization included

### Backend Integration Steps
1. **Update API endpoints** in service files
2. **Configure authentication** in HTTP client
3. **Replace mock data** with actual API calls
4. **Add environment configuration** for different deployment stages

### API Requirements
The backend should provide endpoints for:
- `GET /api/doctors/:id` - Doctor profile information
- `POST /api/patients` - Patient information submission
- `GET /api/appointments/slots` - Available time slots
- `POST /api/appointments/tokens` - Token generation

## 📱 PWA Features

- **Offline Functionality** - Works without internet connection
- **Install Prompt** - Can be installed on devices like a native app
- **Service Worker** - Automatic updates and background sync
- **App-like Experience** - Full-screen mode and native feel
- **Push Notifications** - Ready for appointment reminders (backend required)

## 🎨 Customization

### Doctor Profile Customization
- Update `src/services/doctorService.js` with doctor-specific information
- Modify `src/assets/` folder with doctor photos and clinic branding
- Customize color themes in component CSS files

### Specialization Support
- The widget architecture supports any medical specialization
- Easy to add specialty-specific features and information
- Flexible layout system accommodates different content types

## 🚀 Deployment

### Development
```bash
npm run dev          # Start development server
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### PWA Deployment
- Ensure HTTPS for PWA features
- Configure web app manifest for branding
- Set up service worker caching strategies

## 📄 License

This project is open source and available for medical practitioners to customize for their clinics.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- Bug fixes and improvements
- New medical specialization features
- Backend integration enhancements
- UI/UX improvements

## 🆘 Support

For technical support, feature requests, or deployment assistance:
- Open an issue on GitHub
- Check the documentation in the `/docs` folder
- Review the service layer architecture for backend integration

## 🔮 Roadmap

### Planned Features
- **Multi-doctor support** - Support for clinics with multiple practitioners
- **Advanced scheduling** - Recurring appointments and availability management
- **Patient portal** - Account creation and appointment history
- **Payment integration** - Online payment processing
- **Telemedicine** - Video consultation capabilities
- **Analytics dashboard** - Comprehensive reporting and insights+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
