import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import moment from 'moment'
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	current_user: storageFor('current_user'),
  lineData: {},
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
          {
            label: "Challenges over the past week",
            fill: false,
            lineTension: 0,
            fillColor: "rgba(75,192,192,0.4)",
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(75,192,192,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            datasetFill: false,
            data: [3, 2, 4, 2, 4, 2, 2],
        }
    ]
  },
  polarData: {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(179,181,198,0.4)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
  },
  
  options: {
    responsive: true,
    lineTension: 0.1,
    fill: false,
    datasetFill: false

    // showLines: false,
  },
  doughnutData: {
    labels: [
        "Red",
        "Green",
        "Yellow"
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
},
  type: "Bar",
  ready: false,
  in: function() {
    var current = new Date(Date.now());
    var da = moment(moment(current).subtract(1, 'year').calendar()).format();
    var lineData = this.get('data');
    var labels = [];
    var data = [];
    var that = this;

    this.store.query('activity', {subjectId: that.get('current_user.id'), verb: "completed", time: { $gt: da }}).then(function(activities) {
      // Retrieve all date where a challenge was successfully completed
      var date;
      activities.map(function(activity) {
        /*
          Loop on each activity, group all challenges that were
          solved on the same day together 
         */
        date = new Date(activity.get('time'));
        date = (moment(date).format('dddd, MMM Do')).toString();

        if (!(_.includes(labels, date))) {
          labels.push(date);
          data.push(1);
        }
        else {
          data[labels.indexOf(date)] += 1;
        }

        
      });
      lineData.labels = labels;
      lineData.datasets.data = data;
      that.set('lineData', lineData);
      that.set('ready', true);
    });
  }.on('init'),
	actions: {
		session: Ember.inject.service('session'),
    invalidateSession() {
    	Ember.$.ajax({
        type: 'DELETE',
        url: '/logout'
      });
    	this.set('current_user', null);
      this.get('session').invalidate();
      
    },
    changeType: function() {

      if (this.get('type') === 'Bar') {
        console.log("ok")
        this.set('type', 'Line');
      }
      else {
        console.log("no")
        this.set('type', 'Bar');
      }
    },
    changeDate: function(period) {
      var lineData = this.get('data');
      var labels = [];
      var data = [];
      var that = this;
      var current = moment(new Date(Date.now()));
      var previous;
      switch (period){
        case 'week': 
          previous = moment(current.subtract(7, 'days').calendar()).format();
          break;
        case 'month':
          previous = moment(current.subtract(1, 'month').calendar()).format();
          break;
        case 'year':
          previous = moment(current.subtract(1, 'year').calendar()).format();
          break;
      }
      this.store.query('activity', {subjectId: that.get('current_user.id'), verb: "completed", time: { $gt: previous }}).then(function(activities) {
        // Retrieve all date where a challenge was successfully completed
        var date;
        activities.map(function(activity) {
          /*
            Loop on each activity, group all challenges that were
            solved on the same day together 
           */
          date = new Date(activity.get('time'));
          date = (moment(date).format('dddd, MMM Do')).toString();

          if (!(_.includes(labels, date))) {
            labels.push(date);
            data.push(1);
          }
          else {
            data[labels.indexOf(date)] += 1;
          }

          
        });
        lineData.labels = labels;
        lineData.datasets.data = data;
        that.set('lineData', lineData);
        that.set('ready', true);
      });

      
    }
  }
});
