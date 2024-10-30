var location_s = window.location.href;
var data=[];
var showSource=0;
/********* Check Login Status*/
if(location_s.indexOf("iRedlof-GA-Stats.php")>=0)
	{
		var chart1 = new FusionCharts("../wp-content/plugins/iRedlof-GA-Stats/charts/Line.swf", "LineGraph","900", "350", "0", "1");
		chart1.setDataURL("../wp-content/plugins/iRedlof-GA-Stats/charts/data.xml");
		chart1.render("chart1div");
		var chart2 = new FusionCharts("../wp-content/plugins/iRedlof-GA-Stats/charts/Pie2D.swf", "PieGraph","450", "350", "0", "1");
		chart2.setDataURL("../wp-content/plugins/iRedlof-GA-Stats/charts/data.xml");
		chart2.render("chart2div");
		var chart3 = new FusionCharts("../wp-content/plugins/iRedlof-GA-Stats/charts/Pie2D.swf", "OSPieGraph","450", "350", "0", "1");
		chart3.setDataURL("../wp-content/plugins/iRedlof-GA-Stats/charts/data.xml");
		chart3.render("chart3div");
		getStatus();
		/*var mCal1= new dhtmlxCalendarObject("SDate", false, {isYearEditable: true}); 
		mCal1.setSkin("vista");
		mCal1.draw();
		var mCal2= new dhtmlxCalendarObject("EDate");
		mCal2.setSkin("vista");
		mCal2.draw();*/
		
		var Tdate=new Date();
		mDCal = new dhtmlxDblCalendarObject('dhtmlxDblCalendar', false, {isMonthEditable: true, isYearEditable: true});
		mDCal.setYearsRange(1980, 2020);
		mDCal.setDateFormat("%Y-%m-%d");
		mDCal.setDate("2009-05-01","2009-5-07")
		mDCal.draw();
		mDCal.setOnClickHandler(function(date,self,type){
			if (type=="right")
				document.getElementById("EDate").value = mDCal.rightCalendar.getFormatedDate(null,date);
			else
				document.getElementById("SDate").value = mDCal.leftCalendar.getFormatedDate(null,date);
		})
		mDCal.hide();
	}
	
	
dhtmlxEvent(document.getElementById("SDate"),"click",function(e){
		if(mDCal.isVisible ())
		{
			mDCal.hide ();
			document.getElementById("ApplyDate").style.display="none";
		}
		else
		{
			mDCal.show ();
			document.getElementById("ApplyDate").style.display="block";
		}
		(e||event).cancelBubble=true;
	})
	dhtmlxEvent(document.getElementById("EDate"),"click",function(e){
		if(mDCal.isVisible ())
		{
			mDCal.hide ();
			document.getElementById("ApplyDate").style.display="none";
		}
		else
		{
			mDCal.show ();
			document.getElementById("ApplyDate").style.display="block";
		}
		(e||event).cancelBubble=true;
	})
	dhtmlxEvent(document.body,"click",function(e){
		//mDCal.hide();
	})
/*****************************/

/*Create Table Graph on load */

/**************************************/

function updateChart(DOMId){
   var chartObj = getChartFromId("LineGraph");
   var chart_content_start = '<chart xAxisNamePadding="0" labelPadding="7" labelDisplay="Rotate" decimals="2" slantLabels="1" caption="Google Analytics Stats by iRedlof" subcaption="'+Opp1+' Vs '+'Date"'+' xAxisName="Date" yAxisName="'+Opp1+'" yAxisMaxValue="15" labelStep="2" numberSuffix="'+Suffix+'" alternateHGridColor="0077cc" alternateHGridAlpha="10" divLineColor="058dc7" divLineAlpha="50" canvasBorderColor="666666" baseFontColor="666666" lineColor="058dc7" anchorRadius="5" canvasPadding="20">';
   var chart_content_end = '<styles><definition><style name="DataShadow" type="Shadow" alpha="40"/><style name="myHTMLFont" type="font" isHTML="1" /><style name="myBevel" type="bevel" distance="2" /></definition><application><apply toObject="TOOLTIP" styles="myHTMLFont" /><apply toObject="DIVLINES" styles="Anim1"/><apply toObject="DATALABELS" styles="DataShadow,Anim2"/><apply toObject="ANCHORS" styles="myBevel" /> </application></styles></chart>'
   chartObj.setDataXML(chart_content_start+LineDataValue+chart_content_end);
}

function updatePie(DOMId){
	var PieObj = getChartFromId("PieGraph");
   var Pie_content_start = '<chart showPercentageValues="1" use3DLighting="1" plotFillAlpha="100" caption="Traffic Source Stats" radius3D="10" pieRadius="95" enableSmartLabels="1">';
   var Pie_content_end = '<styles><definition><style name="DataShadow" type="Shadow" alpha="40"/></definition><application><apply toObject="DATALABELS" styles="DataShadow,Anim2"/></application></styles></chart>'
   PieObj.setDataXML(Pie_content_start+PieDataValue+Pie_content_end);
}

function updateOs(DOMId){
	var OsObj = getChartFromId("OSPieGraph");
   var Os_content_start = '<chart showPercentageValues="1" use3DLighting="1" plotFillAlpha="100" caption="Operating Systems Stats" radius3D="10" pieRadius="95" enableSmartLabels="1">';
   var Os_content_end = '<styles><definition><style name="DataShadow" type="Shadow" alpha="40"/></definition><application><apply toObject="DATALABELS" styles="DataShadow,Anim2"/></application></styles></chart>'
   OsObj.setDataXML(Os_content_start+OsDataValue+Os_content_end);
}


var LineDataValue='';
var PieDataValue='';
var OsDataValue='';
var Opp1="";
var Suffix='';
var datafile2="<chart><series><value xid='1'>1</value></series>";
var datafile3='<pie>';
var datafile4="</pie>";

function revDate(str) 
	{
		var months = new Array(12);
		months[00] = "Jan";	
		months[01] = "Feb";
		months[02] = "Mar";
		months[03] = "Apr";
		months[04] = "May";
		months[05] = "Jun";
		months[06] = "Jul";
		months[07] = "Aug";
		months[08] = "Sep";
		months[09] = "Oct";
		months[10] = "Nov";
		months[11] = "Dec";
		var YY=str.substring(2,4);
		var MM=str.substring(4,6);
		var DD=str.substring(6,8);
		return (DD+' '+months[MM-1]+' '+YY); 
	}
	


function ShowHide(){mDCal.hide ();document.getElementById("ApplyDate").style.display="none";updateSources();}

function addRow(text){
    var newId = (new Date()).valueOf()
    mygrid.addRow(newId,text,mygrid.getRowsNum())
    mygrid.selectRow(mygrid.getRowIndex(newId),false,false,true);
}