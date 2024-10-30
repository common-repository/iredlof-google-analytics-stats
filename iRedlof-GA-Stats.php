<?php
/*
Plugin Name: iRedlof Google Analytics Stats
Plugin URI: http://iredlof.com/2009/04/iredlof-google-analytics-stats-wordpress-plugin/
Description: Tracks views, post/page views, referrers, and clicks. Requires <a href="http://www.google.com/analytics/">Google Analytics</a> Account.
Author: Rohit LalChandani
Version: 2.0
Author URI: http://iredlof.com
*/

if (!class_exists("GAClass")) 
{
	class GAClass
	{
		function GAClass()
		{
		}
		
		function printSettingsPage()
		{?>
<div class=wrap><h2>iRedlof Google Analytics Stats Settings</h2><form action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
" />
Do Appreciation For My Work by <input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" name="submit" alt="PayPal - The safer, easier way to pay online!" style="vertical-align:middle;" /><br/>if you have any difficulty in using it or have any queries regarding it, then you can post your queries as a comment <a href="http://iredlof.com/2009/04/iredlof-google-analytics-stats-wordpress-plugin/">here</a>
<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
</form>
<br/><br/>	
		<?php
        }
		
		//Prints out the admin page
		function printAdminPage() 
		{?>
<div class=wrap><h2>iRedlof Google Analytics Stats</h2><form action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
" />
Do Appreciation For My Work by <input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" name="submit" alt="PayPal - The safer, easier way to pay online!" style="vertical-align:middle;" /><br/>if you have any difficulty in using it or have any queries regarding it, then you can post your queries as a comment <a href="http://iredlof.com/2009/04/iredlof-google-analytics-stats-wordpress-plugin/">here</a>
<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
</form>
<br/><br/><div id="status" style="text-align:center; font-weight:bold;"></div>
<div style="float:right;"><span id="dhtmlxDblCalendar" style="vertical-align:top; margin-top:20px;"></span>
<span class="submit" id="ApplyDate" style="vertical-align:top;display:none;float:right;"><input type="button" readonly="true" value="Apply Dates" style="width:120px;"  onclick="javascript:ShowHide();" /></span></div>
<table><tr><td style="text-align:center;" id="chart1div"></td><td style="vertical-align:top;border:#999 1px solid;">
    <div id="wpbody" style="margin:0px 10px;;">
	<ul id="adminmenu" style="margin:0px;">
    <li class="wp-first-item current menu-top menu-top-first menu-top-last" id="menu-dashboard">
	<div class="wp-menu-image"><br /></div><div class="wp-menu-toggle"><br /></div><span id="btnLogin"><a href='javascript:login();' class="wp-first-item menu-top menu-top-first menu-top-last" tabindex="1">Login</a></span></li>
    <li><hr/></li>
    <li class="submit">Profile ID(s): <select name="ProfileIds" id="ProfileIds" style="width:120px;" onchange="javascript:updateSources();">
	</select><br/><input type="button" name="button" id="pId" value="Refresh List" onclick="javascript:getAccountFeed();" style="width:120px;" /></li>
    <li><hr/></li>
	<li><strong>Report List:</strong><br/><select name="GAReport" id="GAReport" onchange="javascript:getPageviewsByCityFeed();">
      <option value="ga:visits" selected="selected">Visits</option>
      <option value="ga:visitors">Visitors</option>
      <option value="ga:pageviews">Total Pageviews</option>
      <option value="ga:uniquePageviews">Unique Pageviews</option>
      <option value="ga:pageviews,ga:visits">Pages/Visit</option>
      <option value="ga:newVisits,ga:visits">% New Visitors</option>
      <option value="ga:bounces,ga:entrances">% Bounce Rate</option>
    </select></li>
	<li><hr/></li>
    <li class="submit"><strong>Start Date:</strong><br/><input type="button" id="SDate" readonly="true" value="2009-04-21" style="width:120px;" /></li>
    <li class="submit"><strong>End Date:</strong><br/><input type="button" id="EDate" readonly="true" value="2009-05-03" style="width:120px;" /></li>
    <li><hr/></li>
    <li class="submit">
    <input type="button" name="button" id="ShowGraph" value="Update Changes" onclick="javascript:updateSources();" style="width:120px;" /></li>
    </ul></div></td></tr>
    <tr><td style="text-align:left;"><span id="chart2div"></span><span id="chart3div"></span></td><td style="vertical-align:top;border:#999 1px solid;">
    <div id="wpbody" style="margin:0px 10px;">
	<ul id="adminmenu" style="margin:0px;">
    <li class="submit"><strong>Traffic Stats:</strong><br/><input type="button"  readonly="true" value="Refresh Traffic Source" style="width:120px;" onclick="javascript:getMediumByCityFeed();" /></li>
    <li><hr/></li>
    <li class="submit"><strong>Operating Stats:</strong><br/><input type="button"  readonly="true" value="Refresh OS Stats" style="width:120px;" onclick="javascript:getOSByVisitFeed();" /></li>
    <li><hr/></li>
    <li class="submit"><strong>Top 10 Pages:</strong><br/><input type="button"  readonly="true" value="Refresh Top Pages" style="width:120px;" onclick="javascript:getTopPagesByPageViewsFeed();" /></li>
    </ul></div></td></tr>
    <tr><td><div id="gridbox" width="450px" height="250px" style="background-color:white;overflow:hidden"></div></td></tr>
    <tr><td style="vertical-align:top;">
    <table>
    <tr><td id="flashpie"></td><td>&nbsp;</td></tr>
    </table>
<div id="status"></div>
<div id="display"></div>
<div id="output"></div>
<br/><br/><div></div><div class=wrap><h4>Help Section</h4><hr /><b>Q1.</b> What is iRedlof Google Analytics Stats ?<br/><b>A1.</b> iRedlof Google Analytics(GA) Stats is a wordpess admin panel plugin, I developed it cos i like to manage everything from one place. This plugin is like wordpress .com stats plugin but the difference between the two is that wordpress.com stats works with wordpress analytics stats system and iRedlof GA Stats works with google analytics stats system.<br /><br/><b>Q2.</b> How to use this plugin ?<br/><b>A2.</b> You you need to login in your google anlytics account by clicking on login button, which will redirect you to google login page, where you need to key in your google analytics account username and password and click on allow button to let this plugin access you account on GA Website. Rest i think you can figure it out.<br/><br/><b>Q3.</b>My Stats graphs(Mainly Pie Graphs) are showing random mixed data of other graphs ?<br/><b>A3.</b>This might happen when you have a very low speed internet connection. Contact me to know how to change the delay in your plugin for google request.<br/><h4>Online Help</h4><hr/>if you have any difficulty in using it or have any queries regarding it, then you can post your queries as a comment <a href="http://iredlof.com/2009/04/iredlof-google-analytics-stats-wordpress-plugin/">here</a><br/><h4>Version 2.0 Updates</h4><hr/><b>1.</b> Demo Stats Graphs on page load.<br/><b>2.</b> New User Friendly GUI(Graphical User Interface).<br/><b>3.</b> Operating System Stats.<br/><b>4.</b> Top 10 Pages from your website.<br/><br/><br/><br/><br/><br/>
</div>
					<?php
		}//End function printAdminPage()
	}//End Class GAClass
}

if (class_exists("GAClass")) {
	$dl_gaSeries = new GAClass();
}

//Initialize the admin panel
if (!function_exists("GA_ap")) {
	function GA_ap() {
		global $dl_gaSeries;
		if (!isset($dl_gaSeries)) {
			return;
		}
		add_menu_page('iRedlof Stats', 'iRedlof Stats', 0, basename(__FILE__), array(&$dl_gaSeries, 'printAdminPage')); 
	}	
}

if (isset($dl_gaSeries)) {
	//Actions
	add_action('admin_menu', 'GA_ap');
	add_action('admin_head', 'GAHeaderSupport');
	add_action('admin_footer', 'GASupportFiles');
}

function GAHeaderSupport()
{
	echo('<link media="all" type="text/css" href="'.get_bloginfo('siteurl').'/wp-content/plugins/iRedlof-GA-Stats/css/dhtmlxcalendar.css?ver=20081210" rel="stylesheet" />');
	echo('<link media="all" type="text/css" href="'.get_bloginfo('siteurl').'/wp-content/plugins/iRedlof-GA-Stats/codebase/dhtmlxgrid.css?ver=20081210" rel="stylesheet" />');
}

function GASupportFiles()
{
	echo '<script type="text/javascript" src="'.get_bloginfo('siteurl')."/".PLUGINDIR."/".dirname(plugin_basename(__FILE__)).'/codebase/dhtmlxcommon.js"></script>'."\n";
	echo '<script type="text/javascript" src="'.get_bloginfo('siteurl')."/".PLUGINDIR."/".dirname(plugin_basename(__FILE__)).'/codebase/dhtmlxgrid.js"></script>'."\n";
	echo '<script type="text/javascript" src="'.get_bloginfo('siteurl')."/".PLUGINDIR."/".dirname(plugin_basename(__FILE__)).'/codebase/dhtmlxgridcell.js"></script>'."\n";
	
	
	echo '<script type="text/javascript" src="'.get_bloginfo('siteurl')."/".PLUGINDIR."/".dirname(plugin_basename(__FILE__)).'/charts/FusionCharts.js"></script>'."\n";
	echo '<script type="text/javascript" src="'.get_bloginfo('siteurl')."/".PLUGINDIR."/".dirname(plugin_basename(__FILE__)).'/js/dhtmlxcalendar.js"></script>'."\n";
	echo '<script type="text/javascript" src="'.get_bloginfo('siteurl')."/".PLUGINDIR."/".dirname(plugin_basename(__FILE__)).'/js/dhtmlxcommon.js"></script>'."\n";
	echo '<script type="text/javascript" src="http://www.google.com/jsapi"></script>'."\n";
	echo('<script type="text/javascript">google.load("gdata", "1.x");</script>');
	echo '<script type="text/javascript" src="'.get_bloginfo('siteurl')."/".PLUGINDIR."/".dirname(plugin_basename(__FILE__)).'/js/iRedlofGA.js"></script>'."\n";
	echo '<script type="text/javascript" src="'.get_bloginfo('siteurl')."/".PLUGINDIR."/".dirname(plugin_basename(__FILE__)).'/js/iRedlofCommon.js"></script>'."\n";
}
?>