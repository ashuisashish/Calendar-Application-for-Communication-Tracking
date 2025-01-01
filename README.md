# Calendar Application for Communication Tracking

## Overview

The Calendar Application for Communication Tracking is a React-based tool designed to help companies maintain strong professional relationships by accurately recording interactions with other organizations. This application ensures timely and consistent follow-ups and provides a centralized platform for managing past and future communications efficiently.

## Key Features

- **Admin Module**: Setup and manage companies and communication parameters.
- **User Module**: Visualize, manage, and perform communication tasks.
- **Optional Reporting and Analytics Module**: Gain actionable insights into communication patterns.

---

## Getting Started

### Clone the Repository

```bash
git clone 
```

### Install Dependencies

```bash
npm install
```

### Run the Server

```bash
http://localhost:8080/reports
```

### Start the Application

```bash
npm run dev
```

### Live Deployment

[Calendar Application on Github]( )

---

## Objective

This application aims to:

- Log past interactions and plan future communications.
- Manage engagement frequency based on predefined schedules.
- Provide a centralized platform for communication tracking.

---

## Modules and Features

### Admin Module

#### Company Management

Admins can:

- Add, edit, and delete companies with the following details:
  - Name
  - Location
  - LinkedIn Profile
  - Emails
  - Phone Numbers
  - Comments
  - Communication Periodicity (e.g., every 2 weeks)

#### Communication Method Management

Admins can define available communication methods, including:

- Name (e.g., "Visit")
- Description (e.g., "Visit to company premises")
- Sequence (order of communication)
- Mandatory Flag (indicates if the method is mandatory)

_Default Communication Methods (in order):_
1. LinkedIn Post
2. LinkedIn Message
3. Email
4. Phone Call
5. Other

### User Module

#### Dashboard

- **Grid View**: Displays each company with:
  - Company Name
  - Last Five Communications
  - Next Scheduled Communication
- **Color-Coded Highlights**:
  - Red: Overdue communication
  - Yellow: Communication due today

#### Interactive Features

- **Hover Effect**: Tooltip displays notes or comments for completed communications.
- **Communication Action**:
  - Select one or multiple companies.
  - Log a new communication with type, date, and notes.

#### Notifications

- Overdue Communications Grid
- Today's Communications Grid
- Notification badge with overdue and due counts

#### Calendar View

- View past communications and manage upcoming interactions.

### Reporting and Analytics Module (Optional)

- **Communication Frequency Report**:
  - Visual representation (bar chart, pie chart) of communication methods.
  - Filters by company, date range, or method.
- **Engagement Effectiveness Dashboard**:
  - Track response rates by communication methods.
- **Overdue Communication Trends**:
  - Trendline or heatmap of overdue communications over time.
- **Downloadable Reports**: Export data in PDF or CSV formats.
- **Real-Time Activity Log**: Live feed of communication activities.

---

## Application Architecture

### Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Deployment**: Github

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## Contact

For further inquiries, please reach out to the repository owner.