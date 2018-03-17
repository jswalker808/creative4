Vue.component('star-rating', VueStarRating.default);

var app = new Vue({
  el: '#app',
  data: {
    welcomeMessage: '',
    showGreeting: true,
    number: '',
    searchTitle: '',
    current: {},
    loading: false,
    addedName: '',
    addedComment: '',
    comments: {},
    numComments: 0,
    rating: 0,
    showApp: false,
    numberRatings: 0,
    average: [],
    ratings: {},
    date: '',
  },
  created: function() {
    this.welcomeMessage = 'Welcome to Ciname Reviews!';
  },
  methods: {
    addSearch: function(e) {
      this.showGreeting = false;
      fetch('https://www.omdbapi.com/?t=' + this.searchTitle + '&apikey=a70e5d5b&').then(response => {
         console.log(response.data);
  	     return response.json();
      }).then(json => {
        this.showApp = true;
      	this.current = json;
        console.log(this.current);
        this.loading = false;
        this.number = json.num;
      	return true;
      }).catch(err => {
      });
    },
    addRating: function(rating) {
      if (!(this.number in this.ratings))
        Vue.set(this.ratings,this.number,{sum:0,number:0,avg:0});
      this.ratings[this.number].sum += rating;
      this.ratings[this.number].number += 1;
      var roundedAverage = this.ratings[this.number].sum / this.ratings[this.number].number;
      this.ratings[this.number].avg = Math.round(roundedAverage * 10 ) / 10;;
      console.log(this.ratings[this.number]);
    },
    getDate: function() {
      var string = '';
      var d = new Date();
      string += " " + d.getMonth();
      string += "/" + d.getDate();
      string += "/" + d.getFullYear();
      string += " " + d.getHours();
      if (d.getMinutes() < 10) {
        string += ":0" + d.getMinutes();
      }
      else {
        string += ":" + d.getMinutes();
      }
      return string;
    },
    addComment: function() {
      console.log('Hello World');
      this.date = this.getDate();
      if (!(this.number in this.comments))
	      Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push({author:this.addedName,text:this.addedComment, date:this.date, time:this.time});
      this.numComments++;
      this.addedName = '';
      this.addedComment = '';
    },
  },
  watch: {
     number: function(value,oldvalue) {
       if (oldvalue === '') {
   	     this.max = value;
       } else {
   	     this.xkcd();
       }
     },
   },
  computed: {
    averageRating: function(ratings) {
      if (!(this.number in this.ratings))
        Vue.set(this.ratings,this.number,{sum:0,number:0,avg:0});
    },
  },
});
