pimpMyInput
===========

Validates words in an input following a regexp (See demo)

Dependencies :

+  [jQuery](http://jquery.com/)
+  [jQuery Caret](http://plugins.jquery.com/caret/), a jQuery plugin to manipulate the caret's position in a text box or content-editable element. 
+  [jQuery Color](https://github.com/jquery/jquery-color), a jQuery plugin for color manipulation and animation support.


## How to use
You must have an input included in the **top left corner** of a div container with class `pimpMyInput_container`

Call :
`$('#myInput').pimpMyInput(regex);`

For example, you can call :
`$('#myInput').pimpMyInput('^(?:\\s)*(@[A-Za-z0-9_]+)$');`
to validate only words corresponding to Twitter accounts.

+ When you type a word, it will be transformed into a button when you press the space bar.
+ You can click on the delete icon in the top right corner of a button to delete it
+ You can navigate with keyboard arrows througout buttons, and press Suppr/Del to delete one
+ You can click on a button and press Suppr/Del to delete one