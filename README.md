# Be The Hero
<center>Centered text</center>

![Logo](/.github/logo.jpeg)

> Project developed during the **11th OmniStack Week** by 🚀[Rocketseat](rocketseat.com.br)

## Sumary :bookmark_tabs:
[Intro](#intro)

[Website features](#website-features)
- [Registration and Login](#registration-and-login)
- [Manage Incidents and Logout](#manage-incidents-and-logout)
- [Edit Organization Information](#edit-organization-information)

[Mobile app features](#mobile-app-features)
- [Main functionalities](#main-functionalities)
- [City filter system](#city-filter-system)

## Intro :door:
[Back to sumary](#sumary)

Omnistack week is an event to discover **new technologies and tools, learn new concepts and get new skills**. During this intense week, we get access to content **focused on the practice** of technologies that are used by big companies like Facebook, Netflix, Airbnb and many others. Besides having access to an **exclusive community** with Rocketseat instructors and thousands of other developers. The main technologies used in this event:
- Node.js for back-end;
- React.js for front-end;
- React Native for mobile.	

We developed a **website** called **BeTheHero** where an **organization could add incidents** that need financial assistance from society and a **mobile app** where people could access and see a list with the created incidents, select one and **contact the organization**. The default features were made with the Rocketseat instructor. So I decided to practice the learned knowledge by myself and I create new features. Let's see the entire website and mobile app features.

## Website features
### Registration and Login
[Back to sumary](#sumary)

On the register page, an organization enters its information and the website returns a unique login ID. By default, the organization had to write the state and the city. And it was possible to register a new organization with the same name, e-mail or whatsapp. So I created a tool to select the state and city of a list. And now it's not possible to create a new login with information that's already registered.

- Registering a new ONG

![Registration and Login](https://media.giphy.com/media/f4JibkmrNnwTXL1wSx/source.gif)

- Trying to create with registered information

![Trying to Create Again](https://media.giphy.com/media/Wt1YwEZwISSixnJcla/source.gif)

### Manage Incidents and Logout
[Back to sumary](#sumary)

On the profile page it's possible to manage the incidents. By default, the organization can create and delete incidents and checks the ones that are already created. And it's possible to logout. So I created a new page where it's possible to edit an incident
 - Creating and deleting
 
 ![Create and Delete Incident](https://media.giphy.com/media/dUMpJVxWN4MR49txcL/source.gif)
 
 - Editing incident
 
 ![Editing Incident](https://media.giphy.com/media/QX1jtYDWJlahSakJng/source.gif)
  
### Edit Organization Information
[Back to sumary](#sumary)

One more feature that I created: a new page where the organization can update its information. Like at register page, it has a list with states and cities of Brazil and it's not possible to set a name, email or whatsapp of another registered organization.

![Updating Organization](https://media.giphy.com/media/THmnMqOWsPXtdVJfmZ/source.gif)

## Mobile app features 
### Main functionalities
[Back to sumary](#sumary)

On the main page of the mobile app, it's possible to check all created incidents, get details about each one (it opens in a new page) and contact the organization via e-mail or whatsapp. All these features were created with Rocketseat instructor

![Default features mobile app](https://media.giphy.com/media/U1yOMk2cOQE5h6106r/source.gif)
### City filter system
[Back to sumary](#sumary)

So I created a new tool: a city filter system. Just need to select the state and the city and it shows all incidents created by an organization registered in this city. If I set a city where has no organization registered, the app returns a message informing that. It's possible to clean the filter.

![Mobile app new features](https://media.giphy.com/media/ii7K2ERffmQcIGukUC/source.gif)
