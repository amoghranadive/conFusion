'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        
        $scope.showMenu = false;
        $scope.message = "Loading...";
        
        $scope.dishes = menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
            
        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = '';
            }
        };

        $scope.isSelected = function(tabNumber) {
            return ($scope.tab === tabNumber);
        };
        
        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };

    }])
    
    .controller('ContactController', ['$scope', function($scope) {
        
        $scope.feedback = {
                            mychannel:"",
                            firstName:"",
                            lastName:"",
                            agree:false,
                            email:""                              
                        };
        
        $scope.channels = [{value:"tel", label:"Tel."},
                       {value:"Email", label:"Email"}];
        
        
        $scope.invalidChannelSelection = false;
        
    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
        
        $scope.sendFeedback = function() {            
                
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
                
            } else {
                
                $scope.invalidChannelSelection = false;
                            
                feedbackFactory.getFeedback().save($scope.feedback);
                            
                $scope.feedback = {
                    mychannel:"",
                    firstName:"",
                    lastName:"",
                    agree:false,
                    email:""                              
                };
                
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
            }        
        };
        
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {            
        
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message = "Loading...";
        
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                    function(response) {
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
            );
    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.userComment = {
                            author:"",
                            rating:5,
                            comment:"",
                            date:""
                        };
            
            $scope.submitComment = function () {
                    
                $scope.userComment.date = new Date().toISOString();    
                console.log($scope.userComment); 

                $scope.dish.comments.push($scope.userComment);
                
                menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);

                $scope.commentForm.$setPristine();
                
                $scope.userComment = {
                            author:"",
                            rating:5,
                            comment:"",
                            date:""
                        };
            };
    }])

    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
        
            $scope.showDish = false;
            $scope.message = "Loading...";
            
            $scope.showPromotion = false;
            $scope.promotionMessage = "Loading...";
        
            $scope.showChef = false;
            $scope.chefMessage = "Loading...";
        
            $scope.featuredDish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response) {
                        $scope.featuredDish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
            );
        
            $scope.featuredPromotion = menuFactory.getPromotions().get({id:0})
                .$promise.then(
                    function(response) {
                        $scope.featuredPromotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.promotionMessage = "Error: " + response.status + " " + response.statusText;
                    }
            );
        
            $scope.executiveChef = corporateFactory.getLeaders().get({id:0})
                .$promise.then(
                    function(response) {
                        $scope.executiveChef = response;
                        $scope.showChef = true;
                    },
                    function(response) {
                        $scope.chefMessage = "Error: " + response.status + " " + response.statusText;
                    }
            );
        
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
        
            $scope.showLeaders = false;
            $scope.message = "Loading...";
            
            $scope.leaders = corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );       
    }])

;
