
var vue = new Vue({
    el: '#app',
    data: {
        name:"",
        description:"",
        completed:"",
        assignedTo:"",
        posts: [],
        add:[]
    },
    created: function(){
        this.loadPosts();
        this.addNew();
    },
    methods: {
        //GET lettura di tutti gli utenti disponibili
        loadPosts() {
            fetch('http://localhost:3001/users')
                .then((response) => {return response.json()})
                .then((response) => {
                    this.posts = response;
                    console.log("response:",response);
                })
                .catch(function(err){
                    console.log("err:", err);
                })
            
        },
        //POST Di Creazione ToDo
        addNew(){
            var newToDo1={
                name:this.name,
                description:this.description,
                completed:this.completed,
                assignedTo:this.assignedTo
            }
            var url = 'http://localhost:3001/list';
                this.$http.post(url,newToDo1).then((response) => {
                    console.log("response",response);
                })
            },
        //GET lettura di tutti i ToDo filtrata per utente
        getNew(){
            var us="mamma";
            var url='http://localhost:3001/list_users?assignedTo=us';
            this.$http.post(url,us).then((response) => {
                    this.add=response.body;
                    return this.add;
            }).catch(function(err){
                    console.log("err:", err);
                })
        },
        //DELETE Cancellazione di un ToDo in base all ID
        
        deliteById(id){
            var id='0';
             var url = 'http://localhost:3001/list/:id';
                this.$http.delete(url,id).then(response => {
                    console.log("eliminato!");
                })
                .catch(function(err){
                    console.log("err:", err);
                })
            
        }
    },
    watch: {
        
    }

})
