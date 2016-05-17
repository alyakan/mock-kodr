import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import moment from 'moment'
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	current_user: storageFor('current_user'),
  lineData: {},
  wData: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Challenges successfully solved over the past week",
        fill: false,
        lineTension: 0,
        fillColor: "rgba(75,192,192,0.4)",
        datasetFill: false,
        data: [],
      }
    ]
  },
  mData: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Challenges successfully solved over the past month",
        fill: false,
        lineTension: 0,
        fillColor: "rgba(75,192,192,0.4)",
        datasetFill: false,
        data: [],
      }
    ]
  },
  yData: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Challenges successfully solved over the past year",
        fill: false,
        lineTension: 0,
        fillColor: "rgba(75,192,192,0.4)",
        datasetFill: false,
        data: [],
      }
    ]
  },
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Exp",
        fill: false,
        lineTension: 0,
        fillColor: "rgba(75,192,192,0.4)",
        datasetFill: false,
        data: [],
      }
    ]
  },
  doData: [{
    value: 8,
    color: "#00B233",
    label: "Conditionals"
  }, {
    value: 2,
    color: "#7CB2AF",
    label: "Incomplete"
  }],
  options: {
    responsive: true,
    bezierCurveTension : 0.1,
    datasetFill: false,
    angleLineWidth : 3,
    angleLineColor : "rgba(179,181,198,.5)",
    scaleBeginAtZero: true
    // showLines: false,
  },
  type: "Line",
  ready: false,
  doughtnutData: [],
  
  in: function() {
    
    var that = this;
    this.store.query('userConcept', {user: that.get('current_user.id')}).then(function(userConcepts) {
    	// Retrieve UserConcepts to display concept mastery in a doughnut chart	
    	var dataList = [];
    	userConcepts.map(function(uc) {
    		var segment = [];
    		uc.get('concept').then(function(c) {
    			segment[0] = {
	    			value: uc.get('exp'),
	    			color: "#00B233",
	    			label: c.get('name')
	    		};
	    		if (uc.get('max_exp') - uc.get('exp') !== 0) {
		    		segment[1] = {
		    			value: uc.get('max_exp') - uc.get('exp'),
		    			color: "#7CB2AF",
		    			label: "Incomplete"
		    		};
	    		} else {
	    			segment[1] = {
		    			value: 0,
		    			color: "#7CB2AF",
		    			label: "Complete!"
		    		};
	    		}
	    		var needsPractice = false;
	    		var threeDaysAgo = new Date(Date.now());
	    		threeDaysAgo = moment(threeDaysAgo).subtract(3, 'day').format('dddd, MMM Do');
	    		var last_practiced = moment(uc.get('last_practiced')).format('dddd, MMM Do');
	    		if (threeDaysAgo > last_practiced) {
	    			needsPractice = true;
	    		}
	    		dataList.push({
	    			doughtnutDataList: segment,
	    			conceptName: c.get('name'),
	    			conceptExp: uc.get('exp'),
	    			conceptMax: uc.get('max_exp'),
	    			completed: (uc.get('exp') === uc.get('max_exp')),
	    			needsPractice: needsPractice
	    		});	    		
    		});   		
    	});
    	that.set('doughtnutData', dataList);
    }).then(function() {
    	var current = new Date(Date.now());
	    var lastYear = moment(moment(current).subtract(1, 'year').calendar()).format();
	    var lastMonth = moment(moment(current).subtract(1, 'month').calendar()).format();
	    var lastWeek = moment(moment(current).subtract(1, 'week').calendar()).format();
	    var lineData = that.get('data');
	    var weekLineData = that.get('wData')
	    var monthLineData = that.get('mData')
	    var yearLineData = that.get('yData')
	    var labels = [];
	    var data = [];
	    var weekData = [];
	    var monthData = [];
	    var yearData = [];
	    that.store.query('activity', {subjectId: that.get('current_user.id'), verb: "completed", time: { $gt: lastYear }}).then(function(activities) {
	      // Retrieve all date where a challenge was successfully completed
	      var date;
	      activities.map(function(activity) {
	        /*
	          Loop on each activity, group all challenges that were
	          solved on the same day together 
	         */
	        var act_date = new Date(activity.get('time'));
	        
	        // that.store.findRecord('trial', activity.get('objectId')).then(function(trial) {
	        // 	console.log(trial.get('exp'))
	        // })

	        date = (moment(act_date).format('dddd, MMM Do YY'));
	        console.log(date, '---' ,moment(lastMonth).format('dddd, MMM Do YY'), moment(date).isAfter(moment(lastMonth)))
	        console.log("")
	        if (!(_.includes(labels, date))) {
	        	if (moment(act_date).isAfter(moment(lastMonth))) {
		        	if (moment(act_date).isAfter(moment(lastWeek))) {
		        		console.log('week')
		        		weekData.push(1);
		        	}
		        	monthData.push(1);
		        }
	        	labels.push(date);
	          	data.push(1);
	        }
	        else {
	        	if (moment(act_date).isAfter(moment(lastMonth))) {
		        	if (moment(act_date).isAfter(moment(lastWeek))) {
		        		weekData[labels.indexOf(date)] += 1;
		        	}
		        	monthData[labels.indexOf(date)] += 1;
		        }
	          	data[labels.indexOf(date)] += 1;
	        }

	        
	      });
	      
	      lineData.labels = labels;
	      lineData.datasets[0].data = data;

	      monthLineData.labels = labels;
	      //monthLineData.datasets[0].data = monthData;

	      weekLineData.labels = labels;
	      //weekLineData.datasets[0].data = weekData;
	      
	      that.set('lineData', lineData);
	      that.set('wData', weekLineData);
	      that.set('mData', monthLineData);

	      that.set('ready', true);
	      	
	    }).then(function() {
		    Ember.run.scheduleOnce('afterRender', this, function() {
		    	/* Hide last week and last month's challenges solved */
                Ember.$('#week').removeClass("active");
                Ember.$('#month').removeClass("active");
            });
	    });
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
    	console.log(period, "ok")

		switch (period){
			case 'week':
				Ember.$('.week').removeClass("hidden");
				Ember.$('.month').addClass("hidden");
				Ember.$('.year').addClass("hiden");
				//previous = moment(current.subtract(7, 'days').calendar()).format();
				break;
			case 'month':
				Ember.$('.month').removeClass("hidden");
				Ember.$('.week').addClass("hidden");
				Ember.$('.year').addClass("hiden");
				//previous = moment(current.subtract(1, 'month').calendar()).format();
			  	break;
			case 'year':
				Ember.$('.year').removeClass("hiden");
				Ember.$('.month').addClass("hidden");
				Ember.$('.week').addClass("hiden");
			  	//previous = moment(current.subtract(1, 'year').calendar()).format();
			 	break;
		}

		this.set('lineDate', []);

      
    }
  }
});
