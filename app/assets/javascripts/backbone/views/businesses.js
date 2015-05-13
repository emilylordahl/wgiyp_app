App.Views.Businesses = Backbone.View.extend({

	el: '#outer-container',

	initialize: function() {
		this.listenTo(this.collection, 'reset', this.renderAll);
		this.listenTo(this.collection, 'add', this.render);
	},

	renderAll: function() {
		this.$('#search-results').empty();
		this.collection.each(this.render, this);
	},

	render: function(business) {
		this.$('#search-results')
		    .append(new App.Views.Business({  model: business }).$el);	
	},

	events: {
		'click .yoga, .veg, .juice': 'getSearchTerm'
	},

	getSearchTerm: function(event) {
		var clicked = $(event.currentTarget);
		var term = clicked.attr('data-value');
		var borough = $('.search-input').val();
			if (borough === '') {
				alert('Please search by location!');	
			} else {
				clicked.toggleClass('clicked');
				this.collection.search(borough, term);
				$('.search-input').val('');		
			}
	}

});