  //-----------------------------------------------------------------
  // configure GA gData API
  //-----------------------------------------------------------------
  var myService = new google.gdata.analytics.AnalyticsService('sampleApp1');
  var scope = 'https://www.google.com/analytics/feeds';

  //-----------------------------------------------------------------
  // AuthSub Authentication
  //-----------------------------------------------------------------
  function login() {
    var token = google.accounts.user.login(scope);
    getStatus();
  }

  function updateSources()
  {
	  getPageviewsByCityFeed();
	  setTimeout("getMediumByCityFeed()",2500);	  
	  setTimeout("getOSByVisitFeed()",7500);
	  setTimeout("getTopPagesByPageViewsFeed()",12500);
  }
  
  function logout() {
    google.accounts.user.logout();
    getStatus();
	window.location.reload(true);
  }
  
  function getAccountFeed() { 
  var myAccountFeedUri = scope + "/accounts/default"; 
  myService.getAccountFeed(myAccountFeedUri, listProfiles, handleError); 
} 

  function getStatus() {
    var statVal = document.getElementById('status');
    var btnLogin = document.getElementById('btnLogin');
    if (google.accounts.user.checkLogin(scope) == '') {
      btnLogin.value = 'Login';
      btnLogin.onclick = login;
      statVal.innerHTML = 'Login to your Google Analytics account to continue';
	  	  statVal.className="error"
    } else {
      btnLogin.innerHTML = "<a href='javascript:logout();' class='wp-first-item menu-top menu-top-first menu-top-last' tabindex='1'>Logout</a>";
      statVal.innerHTML = 'You are logged in';
	  statVal.className="updated"
	  getAccountFeed();
    }
  }

  //-----------------------------------------------------------------
  // GA Data Feed
  //-----------------------------------------------------------------
  function getPageviewsByCityFeed() {
	LineDataValue="";
	PieDataValue="";
	Suffix='';
    var myFeedUri = scope + '/data' +
        '?start-date='+document.getElementById('SDate').value+
        '&end-date='+document.getElementById('EDate').value +
        '&dimensions=ga:date' +
        '&metrics='+document.getElementById('GAReport').value +
        '&sort=ga:date' +
        '&max-results=1000' +
        '&ids=ga:' + document.getElementById('ProfileIds').value;
    myService.getDataFeed(myFeedUri, handleMyFeed, handleError);
  }
  
	function handleMyFeed(myResultsFeedRoot) {
    tableOutput(myResultsFeedRoot.feed);
	updateChart();
  }
  
  function getOSByVisitFeed() {
	LineDataValue="";
	PieDataValue="";
	OsDataValue="";
    var myFeedUri = scope + '/data' +
        '?start-date='+document.getElementById('SDate').value+
        '&end-date='+document.getElementById('EDate').value +
        '&dimensions=ga:operatingSystem' +
        '&metrics=ga:visits'+
        '&sort=ga:visits'+
        '&max-results=1000' +
        '&ids=ga:' + document.getElementById('ProfileIds').value;
    myService.getDataFeed(myFeedUri, handleMyFeedOS, handleError);
  }
  
  function handleMyFeedOS(myResultsFeedRoot) {
    tableOutput(myResultsFeedRoot.feed);
	updateOs();
  }
  
  function getTopPagesByPageViewsFeed() {
	  showSource=1;
	  mygrid = new dhtmlXGridObject('gridbox');
		mygrid.setImagePath("codebase/imgs/");
		mygrid.setHeader("Index, Top 10 Page Address, Page Visits" );
		mygrid.setInitWidths("50,*,70")
		mygrid.setColAlign("left,left,left")
		mygrid.setColTypes("ro");
		mygrid.setColSorting("int,str,int")
		mygrid.init();
		mygrid.setSkin("xp")
		mygrid.parse(data,"jsarray");
    var myFeedUri = scope + '/data' +
        '?start-date='+document.getElementById('SDate').value+
        '&end-date='+document.getElementById('EDate').value +
        '&dimensions=ga:pagePath' +
        '&metrics=ga:pageviews'+
        '&sort=-ga:pageviews'+
        '&max-results=10' +
        '&ids=ga:' + document.getElementById('ProfileIds').value;
    myService.getDataFeed(myFeedUri, handleMyFeedSource, handleError);
  }
  
  function handleMyFeedSource(myResultsFeedRoot) {
    tableOutput(myResultsFeedRoot.feed);
	showSource=0;
  }
  
  function getMediumByCityFeed() {
	LineDataValue="";
	PieDataValue="";
	OsDataValue="";
	datafile3='<pie>';
	datafile4="</pie>";
    var myFeedUri = scope + '/data' +
        '?start-date='+document.getElementById('SDate').value+
        '&end-date='+document.getElementById('EDate').value +
        '&dimensions=ga:medium' +
        '&metrics=ga:visits'+
        '&sort=ga:visits'+
        '&max-results=1000' +
        '&ids=ga:' + document.getElementById('ProfileIds').value;
    myService.getDataFeed(myFeedUri, handleMyFeedPie, handleError);
  }
  
  function handleMyFeedPie(myResultsFeedRoot) {
    tableOutput(myResultsFeedRoot.feed);
	updatePie();
  }
  
  function handleError(e) {
    alert('There was an error!\n' + e.cause ? e.cause.statusText : e.message);
  }
  
  //-----------------------------------------------------------------
  // Format Output
  //-----------------------------------------------------------------
  function tableOutput(feed) {
    var entries = feed.entry;
    var dataSources = feed.getDataSources();
    var aggregatedMetrics = feed.getAggregates().getMetrics();
    var aggregatesTableData = [];
	if(document.getElementById('GAReport').value == "ga:visits")
		Opp1="Visits";
	if(document.getElementById('GAReport').value == "ga:visitors")
		Opp1="Visitors";
	if(document.getElementById('GAReport').value == "ga:pageviews")
		Opp1="Total Pageviews ";
	if(document.getElementById('GAReport').value == "ga:uniquePageviews")
		Opp1="Unique Pageviews ";
	if(document.getElementById('GAReport').value == "ga:newVisits,ga:visits")
		Opp1="New Visitors";
	if(document.getElementById('GAReport').value == "ga:bounces,ga:entrances")
		Opp1="Bounce Rate";
    for (var idx = 0; idx < aggregatedMetrics.length; idx++) {
      var aggregateMetric = aggregatedMetrics[idx];
      aggregatesTableData.push([
        aggregateMetric.getName(),
        aggregateMetric.getValue(),
        aggregateMetric.getConfidenceInterval(),
        aggregateMetric.getType()
      ]);
    }
    var valueLabel=new Array('Direct Traffic','Search Engines','Referring Sites');
	var valueColor=new Array('50b432','ed561b','058dc7');
	var valueSliced = new Array(1,0,0,0,0,0,1,0,0,0,0,0,0,0,0);
	var pullOut=new Array('pull_out="true"','','');
    var entriesTableData = [];
    for (var idx = 0; idx < entries.length; idx++) {
      var entry = entries[idx];
      var row = [];
      var dimensions = entry.getDimensions();
      for (var d = 0; d < dimensions.length; d++) {
        var dimension = dimensions[d];
        row.push(revDate(dimension.getValue()));		
      }
      var metrics = entry.getMetrics();
      for (var m = 0; m < metrics.length; m++) {
        var metric = metrics[m];
		var finalValue="";
        row.push(metric.getValue() +
                 ' (CI ' + metric.getConfidenceInterval() + ')');
		if(showSource==1)
		{
			var myArray=[idx+1,dimension.getValue(),metric.getValue()];
			addRow(myArray);
		}
		if(document.getElementById('GAReport').value == "ga:newVisits,ga:visits" || document.getElementById('GAReport').value == "ga:bounces,ga:entrances")
		{
			if(metrics[m+1])
			finalValue= ((metric.getValue()/metrics[m+1].getValue())*100).toFixed(2);
			LineDataValue=LineDataValue+"<set label='"+revDate(dimension.getValue())+"' value='"+finalValue+"' tooltext='Date "+revDate(dimension.getValue())+"&lt;BR&gt;"+Opp1+" "+finalValue+"%'/>";
			Suffix='%';
			m++;
		}
		else
		{
			if(document.getElementById('GAReport').value == "ga:pageviews,ga:visits")
			{	
				Opp1="Pages/Visit";
				if(metrics[m+1])
				finalValue=(metric.getValue()/metrics[m+1].getValue()).toFixed(2);
				LineDataValue=LineDataValue+"<set label='"+revDate(dimension.getValue())+"' value='"+finalValue+"' tooltext='Date "+revDate(dimension.getValue())+"&lt;BR&gt;"+Opp1+" "+finalValue+"'/>";
				m++;
				
			}
			else
			{	
				LineDataValue=LineDataValue+"<set label='"+revDate(dimension.getValue())+"' value='"+metric.getValue()+"' tooltext='Date "+revDate(dimension.getValue())+"&lt;BR&gt;"+Opp1+" "+metric.getValue()+"'/>";
			}
		}
		PieDataValue=PieDataValue+"<set label='"+valueLabel[idx]+"' value='"+metric.getValue()+"' color='"+valueColor[idx]+"' isSliced='"+valueSliced[idx]+"'/>";
		OsDataValue=OsDataValue+"<set label='"+dimension.getValue()+"' value='"+metric.getValue()+"' isSliced='"+valueSliced[idx+1]+"'/>";
		
	  }
      datafile2=datafile2+"<value xid='"+idx+"'>"+revDate(dimension.getValue())+"</value>";
	  entriesTableData.push(row);
    }
	source=0;
  }
  
  function tableize(rows) {
    var tableStrings = ['<table border="1">'];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      tableStrings.push('<tr>');
      for (var j = 0; j < row.length; j++) {
        tableStrings.push('<td>' + row[j] + '</td>');
      }
      tableStrings.push('</tr>');
    }
    tableStrings.push('</table>');
    return tableStrings.join('');
  }
  
  
  function listProfiles(myResultsFeedRoot) { 
   var ProfileField = document.getElementById('ProfileIds');
   var newOpt1;
   var feed = myResultsFeedRoot.feed; 
   var entries = feed.entry;
   for (var idx = 0; idx < entries.length; idx++) { 
     var entry = entries[idx]; 
	newOpt1 = new Option(entry.getPropertyValue("ga:webPropertyID"), entry.getPropertyValue("ga:profileId"));
    ProfileField.options[idx] = newOpt1;
    ProfileField.selectedIndex = 0;
   } 
}