# CLAUDE.md

## Project Overview

This project is a small frontend application for college applicants.

The main goal of the application is to help a future student choose one of the available IT-related specialties at the college by completing a short questionnaire.

After completing the questionnaire, the student should see a recommendation with:

- the suggested specialty;
- a short explanation of why this specialty may fit them;
- a brief description of what they will study;
- a link to the relevant college department page.

## Target Audience

The application is designed for applicants who are choosing a specialty before entering college.

The interface should be simple, friendly, and easy to understand for users who may not have deep technical knowledge yet.

## Available Specialties

The application should help the student choose between three specialties:

1. **Software Engineering**
    - Ukrainian name: **Інженерія програмного забезпечення**
    - Focus: software development, web applications, programming, databases, software architecture, teamwork in IT projects.

2. **Computer Science**
    - Ukrainian name: **Комп’ютерні науки**
    - Focus: algorithms, data analysis, artificial intelligence basics, programming, information systems, problem solving using computer technologies.

3. **Computer Engineering**
    - Ukrainian name: **Комп’ютерна інженерія**
    - Focus: computer hardware, networks, operating systems, embedded systems, computer architecture, maintenance and configuration of computer systems.

## College Department Links

Use these links in the application when showing information about specialties:

### Programming Department

URL:

```text
https://www.kisit.kneu.edu.ua/?page_id=4820
```

Related specialties:

- Software Engineering / Інженерія програмного забезпечення

### Technical and Information Specialties Department

URL:

```text
https://www.kisit.kneu.edu.ua/?page_id=4823
```

Related specialties:

- Computer Science / Комп’ютерні науки
- Computer Engineering / Комп’ютерна інженерія

## Main User Flow

The expected user flow:

1. The student opens the application.
2. The student sees a short welcome screen explaining the purpose of the app.
3. The student starts the questionnaire.
4. The student answers several questions about their interests, preferences, and learning goals.
5. The application analyzes the answers.
6. The application displays a recommended specialty.
7. The student sees:
    - the specialty name;
    - a short description;
    - what they will study;
    - a link to the relevant college department page.
8. The student can restart the questionnaire and try again.

## Questionnaire Logic

The questionnaire should be based on interests and preferences.

Example question topics:

- whether the student enjoys writing code;
- whether they are interested in creating websites or applications;
- whether they like mathematics and logic tasks;
- whether they are interested in artificial intelligence or data;
- whether they are interested in computer hardware;
- whether they want to understand how networks and operating systems work;
- whether they prefer software development, analysis, or technical infrastructure.

## Recommendation Rules

The recommendation logic can be implemented using a simple scoring system.

Each answer should add points to one or more specialties.

Example:

- answers related to building applications, websites, coding, and teamwork should increase the score for **Software Engineering**;
- answers related to algorithms, data, AI, math, and research should increase the score for **Computer Science**;
- answers related to hardware, networks, system configuration, and computer architecture should increase the score for **Computer Engineering**.

At the end of the questionnaire, the specialty with the highest score should be shown as the recommended option.

If two or more specialties have the same score, show the closest matching specialties and explain that the student may be interested in more than one direction.

## Recommended Specialty Descriptions

Use or adapt the following descriptions in the UI.

### Software Engineering

**Інженерія програмного забезпечення**

This specialty is suitable for students who want to create software, websites, mobile or web applications, and work as developers in IT teams.

Students will study programming, web development, databases, software design, testing, teamwork, and modern software development practices.

Department link:

```text
https://www.kisit.kneu.edu.ua/?page_id=4820
```

### Computer Science

**Комп’ютерні науки**

This specialty is suitable for students who are interested in algorithms, data, artificial intelligence, logical thinking, and solving complex problems using computer technologies.

Students will study programming, algorithms, databases, data processing, information systems, mathematics for computer science, and the basics of intelligent systems.

Department link:

```text
https://www.kisit.kneu.edu.ua/?page_id=4823
```

### Computer Engineering

**Комп’ютерна інженерія**

This specialty is suitable for students who are interested in how computers, networks, operating systems, and hardware work.

Students will study computer architecture, networks, operating systems, hardware configuration, embedded systems, system administration basics, and technical support of computer systems.

Department link:

```text
https://www.kisit.kneu.edu.ua/?page_id=4823
```

## UI Requirements

The frontend should be:

- simple and clean;
- responsive for desktop and mobile devices;
- easy to understand for applicants;
- visually friendly and not overloaded with technical terms.

Recommended pages or screens:

1. **Welcome Screen**
    - short explanation of the app;
    - button to start the questionnaire.

2. **Questionnaire Screen**
    - one question at a time or a clear list of questions;
    - answer options;
    - progress indicator.

3. **Result Screen**
    - recommended specialty;
    - short explanation;
    - what the student will study;
    - department link;
    - button to restart the questionnaire.

## Technical Notes

The project is expected to be a frontend application.

Preferred stack:

- React;
- TypeScript;
- simple component-based structure.

Possible structure:

```text
src/
  components/
    WelcomeScreen.tsx
    QuestionCard.tsx
    ResultCard.tsx
  data/
    questions.ts
    specialties.ts
  logic/
    calculateResult.ts
  App.tsx
```

## Code Style Guidelines

When working on this project:

- use clear and readable component names;
- keep questionnaire data separate from UI components;
- avoid hardcoding all logic directly inside components;
- keep recommendation logic in a separate function;
- use TypeScript types for questions, answers, and specialties;
- write simple, maintainable code;
- prioritize readability over complex abstractions.

## Important Product Goal

The application should not feel like a strict exam or test.

It should feel like a friendly assistant that helps the applicant better understand which IT specialty may fit their interests.

The recommendation should be supportive, not absolute.

Use wording like:

> “This specialty may be a good fit for you”

instead of:

> “You must choose this specialty”
