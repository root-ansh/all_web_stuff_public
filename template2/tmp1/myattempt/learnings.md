## good meta tags =

## std viewport details = 

## css learnings =

1. ways to import other css, adv/disadv
2. ways to apply font to multiple tags, adv/disadv
3. font awesome css can be directly used in buttons, no need for extra I tag


/* 

specify attributes for everytag : affects performance , 
rather use inheritancehttps://stackoverflow.com/q/3942254/7500651 

*/



    
        if we use multiple single case classes,
        then we get more easy understanding about how css is
        applying designs, but get a messed up html page. 
        if we use a single class that is only handling a single tag(like nav, header, etc), 
        we  get a simpler html but can't know about how css is working on our html code
     -

/* media queries is a good way to make stuff responsive. but its an advanced topic */
 


2 topics together: about LESS and usage of ::before selector and adding an icon using css
 we cannot use css class inside another class, but there is a css preprocesor library 
 called LESS which makes it possible to do so.

 for eg, if we have to add a menu icon

 ```css

/*css*/

.nav_links_btn{
    border: 0;
    color: red;
    background-color: inherit;
    
}
.nav_links_btn::before{    
    /* hamburger icon using utf-8 code and fontawesome css.
       basically fontawesome will somehow understand the utf
       code as hamburger icon */
    content: "\f0c9";  
    font-family: "FontAwesome";
    padding-right: 4px;
    
}

/* ========================================================================== */

/* LESS */

.nav_links_btn{
    border: 0;
    color: red;
    background-color: inherit;

    &: before{    /* hamburger icon using utf-8 code */
        content: "\f0c9";  
        font-family: "FontAwesome";
        padding-right: 4px;
        
    }
}




```