I built a simple user interface for my blog post creation script, using React and TypeScript.

About Write.tsx

This is a Next.js component that renders a form for writing a blog post. It imports the React, useState, useEffect, ChangeEvent, and useRef hooks from the "react" module, the ReactMarkdown component from the "react-markdown" module, the rehypeRaw module from the "rehype-raw" module, the DatePicker component from the "react-datepicker" module, the moment module from the "moment" module, and a BlogPostData interface that defines the shape of the data for a blog post.

The component has a state variable called blogPostData that uses the useState hook to manage a partially completed BlogPostData object. It also has a state variable called markdown that uses the useState hook to manage the text content of a blog post body written in markdown. There is also a state variable called publishedDate that uses the useState hook to manage the selected publication date of the blog post.

The component uses the useEffect hook to log the markdown and blogPostData states whenever they change.

The component has several functions for handling user input. The handleInputChange function updates the state of the blogPostData object whenever the user types into an input field. The handleTextAreaChange function updates the state of the blogPostData object and the markdown state whenever the user types into a textarea field. The handleDateChange function updates the state of the publishedDate and blogPostData objects whenever the user selects a publication date using the DatePicker component.

The component also has a handleSaveBlogPost function that saves the completed blog post data to the server using a fetch request. Once the data is successfully saved, the component resets the state variables for the blogPostData object, publishedDate, and markdown. It also displays a toast message using Tailwind CSS classes.

The component renders a form with input fields for the title, author, categories, published date, description, and body of the blog post. The form fields use the value of the blogPostData object state as their default value. The title, author, and categories input fields use the handleInputChange function to update the state of the blogPostData object whenever the user types into them. The published date input field uses the DatePicker component to allow the user to select a publication date. The description and body textarea fields use the handleTextAreaChange function to update the state of the blogPostData object and the markdown state whenever the user types into them. Finally, there is a "Save" button that triggers the handleSaveBlogPost function when clicked.
