# UWA Farm Ridgefield Visitor Induction and Management System

## Overview

### Project Deliverables

1. A visitor induction module with the following features:
2. A visitor management module with the following features:
3. A reporting module with the following features:

## Project Setup

### Installation

To install and run the project on your own local host, you need to install `react.js` and `node.js`.

**Node.js:**

1. Install Node.js from [here](https://nodejs.dev/en/download/).

**React:**

1. After installing Node.js, open the terminal and run the following command:
   
   ```
   sudo npm install -g create-react-app
   ```

**Firebase Cloud Firestore:**

1. Create a new project on Firebase console.
2. Obtain the Firebase project config file from the console.
3. Install Firebase on your project using npm:
   
   ```
   npm install firebase
   ```
   
4. Install Firebase CLI:
   
   ```
   npm install -g firebase-tools
   ```
   
5. Create a `firebase.js` file for CRUD operations and paste the config in the file.

## User Guide

### Registration

Registration is the initial step for visitors to gain access to the platform. During registration, users provide essential details such as their name, contact information, and purpose of visit. This information is crucial for both user identification and emergency contact purposes. Additionally, users must read and accept the site safety rules, demonstrating their commitment to adhering to safety regulations. Upon successful registration, users receive a unique QR code that serves as a digital identity for check-in purposes. The registration process ensures that visitors' information is securely stored and easily accessible for efficient management.

### Login and Authentication

The login and authentication system is the gateway to secure and personalized access within the platform. Upon reaching the login page, users are prompted to enter their registered email and password. The entered credentials are verified against the stored data in the authentication system, ensuring the legitimacy of the user. Once authenticated, users gain access to their personalized dashboard and features. A session token is established, allowing users to navigate the platform without repeatedly providing their credentials. This token is revoked upon logging out or after a specific period of inactivity, enhancing the security of user accounts. The robust login and authentication mechanism guarantees that only authorized individuals can access the platform's functionalities and sensitive information.

### User Dashboard
  ● Read the terms and conditions of using the user dashboard carefully before
  accepting. Make sure you understand what actions are allowed, what actions are
  prohibited, and what happens in case of violation.
  ● If you have any questions or concerns about the user dashboard terms and
  conditions, contact the webpage's support team before accepting.
  ● If you do not agree with the user dashboard terms and conditions, you may choose
  not to use the dashboard.
  ● If you accept the terms and conditions, you are acknowledging your responsibility to
  use the dashboard ethically and in compliance with the rules.
  ● Be aware that the webpage may monitor user activity on the dashboard to ensure
  compliance with the terms and conditions.
  ● If the user dashboard terms and conditions are updated, you will be notified and
  given the option to accept or decline the new terms.


  The user dashboard consists of 4 cards:
    1. Basic user information card
      ● The user’s email address used to login
      ● Their unique identifier
      ● Their special identifier provided by the university
      ● Their current check in status (True or False)
      ● Their check-in or check-out time
    2. Previous visits card
      ● This card stores the previous check-ins made by the user
      ● This card is also used to check-out a visit if not done.
    3. Announcements tab
      ○ Users can see announcements made from the admin in this tab
    4. Contact tab
      ○ Users can contact important personnel from this tab in case of an emergency

### Check-in

  The check-in process enables visitors to mark their arrival at specific locations within the farm. Upon logging in, users can select their desired destination and confirm their intended duration of stay. This information is captured in real-time and recorded within the system. A successful check-in triggers a notification to the farm manager, providing visibility into the current visitor count and activity. By facilitating accurate tracking of visitor movements, the check-in feature enhances safety measures and assists in resource allocation and management.

### Check-out

  Within the user dashboard, users have the ability to review previous visits by accessing the "previous
  visits" card. In order to view the details of a particular visit, users can simply press the "check-out"
  button associated with the visit in question. Once a successful check-out has been made, the
  corresponding date and time will be displayed in the check-out cell of the user dashboard.
  It is important to note that if a user has not yet checked out from a visit, the check-out cell will only
  display the check-out button without any associated date or time information. However, once the
  user has successfully checked out, the check-out time will be automatically added to the cell above
  the check-out button for future reference.
  By providing this functionality, users are able to easily keep track of their previous visits and ensure
  that all check-outs have been completed in a timely manner.

### Log out

The log-out functionality provides users with a secure and straightforward way to end their session. By clicking the "Log Out" button, users are logged out of their account, ensuring the protection of their sensitive data and preventing unauthorized access. This action redirects users to the login page, where they can either log in again or exit the platform. The log-out mechanism is an essential aspect of user account security and privacy, offering a seamless transition between active and logged-out states.

### Navigation

  ● When the visitor has logged in successfully, click on the top left corner and the navigation
  will be displayed
  ● Users with admin role will be displayed an additional page called “Admin” where they can:
  ● See the user database
  ● See the visitor log
  ● Make announcements

### Floating Announcement

  An additional feature we have implemented is the floating announcements which pops up after a
  certain period of time passes reminding the user of important information. When clicked it will
  redirect you to the UWA Farm Ridgefield website.

## Admin Panel/Backend

### Making Announcements

  Another additional feature we implemented would be the announcement board system. Admins can
make announcements for users to see on the admin page. The announcements being made will be
displayed in the user dashboard.

### User/Admin Privileges
  In the user database displayed in the admin page, it is possible to grant users admin privileges. In
  addition it is also possible to change their roles by editing the field in the role cell.


### Deleting Accounts

An additional feature we have included is the deletion of users which can be activated from the user
database table in the admin page.

### Overview of User Database in Firestore

The user database in Firestore serves as a central repository for storing essential user information. When users register, their details, including their name, contact information, and unique identifier, are added to the users collection. Each user is assigned a UID (User ID) generated by Firebase upon registration. This UID is used to establish associations between different user-related data and perform efficient join queries when required. Additionally, user emails and UIDs are stored in the authentication system for streamlined login purposes. The Firestore database structure ensures easy retrieval of user-specific information for seamless user management and interaction within the system.

### Sending Notifications

The notification system is a crucial communication tool within the platform. Utilizing Firebase Cloud Messaging, administrators can deliver important messages to users efficiently. To send a notification, administrators compose a message by specifying the title and content. Once the message is crafted, it can be targeted to specific users or a broader audience. Notifications are transmitted to users' devices, ensuring timely information delivery. This feature proves invaluable for conveying urgent updates, announcements, or critical information to visitors and administrators alike.

## Project Resources

- Project Manager
- Business Analyst
- UX/UI Designer
- Software Developer
- Quality Assurance Specialist
- Farm Manager (for testing and user acceptance)
- Project Mentor (assigned by the university)

## Project Conclusion

### Expected Outcome of the unit CITS3200 Professional Computing

Expected Outcomes:
The project is expected to achieve several outcomes that are critical for the development of
computing professionals. These outcomes include:
1. Developing awareness of the ethical and social responsibilities of computing
professionals.
2. Providing experience in using professional practices in a teamwork setting.
3. Offering a "programming in the large" experience as far as practical.
4. Allowing for the integration of and reflection on previous computer science knowledge.
5. Developing student capability, confidence, and maturity.
6. Modeling industrial practice regarding commercial software development and effective
client relationships.
The expected outcomes of the project are aligned with the goals of developing well-rounded
computing professionals. Through the project, students will gain valuable experience in
working collaboratively on complex tasks, utilizing professional practices and developing a
strong sense of responsibility towards ethical and social issues.
Furthermore, students will have an opportunity to integrate and reflect on their previous
computer science knowledge, which will enhance their skills and knowledge in the field. This
project will provide students with practical experience in "programming in the large," which
will further prepare them for real-world scenarios.
The project will also enable students to develop important soft skills such as effective
communication, problem-solving, and teamwork, which are highly valued in the industry.
Finally, the project will model industrial practice regarding commercial software
development and effective client relationships, which will provide students with a valuable
insight into the expectations of the computing profession.
19
Overall, the expected outcomes of the project are highly relevant and important for the
development of future computing professionals. The project team is committed to ensuring
that these outcomes are achieved to the highest standard.

### Conclusion

In conclusion, the project has been a success and has met its objectives. The project team
has worked diligently to achieve the desired outcomes within the given time frame and
budget. The project has been completed to a high standard and has met the client's
expectations.
Throughout the project, the team has encountered challenges and obstacles, but they have
worked collaboratively to overcome these issues and find appropriate solutions. Effective
communication, planning, and teamwork have been critical to the success of this project.
The project has provided valuable insights and learning opportunities for the team, enabling
them to further develop their skills and expertise. It has also provided a significant benefit to
the client, meeting their business objectives and delivering tangible results.
Overall, the project has been a positive experience for all stakeholders involved, and the
team is proud of the outcome. They look forward to building on this success in future
projects and continuing to deliver high-quality results.
