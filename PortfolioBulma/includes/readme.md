# Guidelines for an includ-able element

- all includes are those elements that are repeated in 1 or more html pages
- every element has its own css icludes that does not depend on the page which includes them
- every element could also have its own js includes, but only the js that is handling its internal working would
  be written there( for  eg, if navigation bar is an element , then the js which is reponsible for handling
  nav button click that appears on smaller screens should be written here)
- The js that is responsibe for handling parent actions should be written in parent( for eg, the )


Sample template:  

```html

<!DOCTYPE html>
<html lang="en">
<head>
        <!-- all css related meta data necessary for below css to work -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <!-- all css necessary for the element to show nicely -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.0/css/bulma.css">


        <!-- all Scripts necessary for functioning of the the element -->
        <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
        <script> 
            $(
              function(){$("#nb").load("navbar.html");}
            );
        </script> 

</head>


<body>
        <!-- The element we want to include -->
        <nav class="..." >
        ...
        </nav>
        
</body>
</html>


```