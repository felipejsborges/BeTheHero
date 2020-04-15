<div align="center">
	<img src="/.github/logo.png" alt="Logo" width="200px" style="max-width:100%"/>
</div>

<br>

<div align="right">
	Project developed during the <strong>11th OmniStack Week</strong> by <g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><a href="https://rocketseat.com.br/">Rocketseat</a>	
</div>

<br>

<div align="center">
	<img src="/.github/app-website.png" alt="App-Website" style="max-width:100%"/>
</div>

<br>

## Sumary
[Intro](#intro) :door:

[Website features](#website-features) :computer:
- [Registration and Login](#registration-and-login) :registered:
- [Manage Incidents and Logout](#manage-incidents-and-logout) :open_book:
- [Edit Organization Information](#edit-organization-information) :pencil2:

[Mobile app features](#mobile-app-features) :iphone:
- [Main functionalities](#main-functionalities) :hammer_and_wrench:
- [City filter system](#city-filter-system) :cityscape:

## Intro
[Back to sumary](#sumary)

Omnistack week is an event to discover **new technologies and tools, learn new concepts and get new skills**. During this intense week, we get access to content **focused on the practice** of technologies that are used by big companies like Facebook, Netflix, Airbnb and many others. Besides having access to an **exclusive community** with Rocketseat instructors and thousands of other developers. The main technologies used in this event:
- Node.js for back-end;
- React.js for front-end;
- React Native for mobile.	

We developed a **website** called **BeTheHero** where an **organization could add incidents** that need financial assistance from society and a **mobile app** where people could access and see a list with the created incidents, select one and **contact the organization**. The default features were made with the Rocketseat instructor. So I decided to put to test the knowledge acquired and create new features. Let's see the entire website and mobile app features.

## Website features
### Registration and Login
[Back to sumary](#sumary)

On the register page, an organization enters its information and the website returns a unique login ID. By default, the organization had to write the state and the city. And it was possible to register a new organization with the same name, e-mail or whatsapp. So I created a tool to select the state and city of a list. And now it's not possible to create a new login with information that's already registered.

- Registering a new ONG

![Registration and Login](/.github/registration-and-login.gif)

- Trying to create with registered information

![Trying to Create Again](/.github/try-create-gain.gif)

### Manage Incidents and Logout
[Back to sumary](#sumary)

On the profile page it's possible to manage the incidents. By default, the organization can create and delete incidents and checks the ones that are already created. And it's possible to logout. So I created a new page where it's possible to edit an incident
 - Creating and deleting
 
 ![Create and Delete Incident](/.github/create-delete-incident.gif)
 
 - Editing incident
 
 ![Editing Incident](/.github/updating-incident.gif)
  
### Edit Organization Information
[Back to sumary](#sumary)

One more feature that I created: a new page where the organization can update its information. Like at register page, it has a list with states and cities of Brazil and it's not possible to set a name, email or whatsapp of another registered organization.

![Updating Organization](/.github/updating-organization.gif)

## Mobile app features
### Main functionalities
[Back to sumary](#sumary)

On the main page of the mobile app, it's possible to check all created incidents, get details about each one (it opens in a new page) and contact the organization via e-mail or whatsapp. All these features were created with Rocketseat instructor

![Default features mobile app](/.github/default-features-app.gif)
### City filter system 
[Back to sumary](#sumary)

So I created a new tool: a city filter system. Just need to select the state and the city and it shows all incidents created by an organization registered in this city. If I set a city where has no organization registered, the app returns a message informing that. It's possible to clean the filter.

![Mobile app new features](/.github/app-new-features.gif)

by [Felipe Borges](https://www.linkedin.com/in/felipejsborges)
