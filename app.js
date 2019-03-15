const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cons = require('consolidate')
const pg = require('pg')
const app = express()
const expressVue = require('express-vue');
//--------------------------------------//

// DB Connect String
var conString = "postgress://newRole:123456@localhost/accounts"

// Assign Dust to engine .dust files
//app.engine('dust', cons.dust)

// Set vue as default
app.set('views', __dirname + './views');
//Optional if you want to specify the components directory separate to your views, and/or specify a custom layout.
app.set('vue', {
    //Default layout is optional it's a file and relative to the views path, it does not require a .vue extension.
    //If you want a custom layout set this to the location of your layout.vue file.
    defaultLayout: 'layout'
});
app.engine('vue', expressVue);
app.set('view engine', 'vue');



// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('index', {
        data: {
            otherData: 'Something Else'
        },
        vue: {
            head: {
                title: 'Page Title',
                head: [
                    { property:'og:title', content: 'Page Title'},
                    { name:'twitter:title', content: 'Page Title'},
                ]
            }    
        }
    });
})


// Server
app.listen(3000, ()=>{
    console.log('Server started on Port 3000')
}) 