package org.sb.ci.service;

import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.sb.ci.Find;
import org.sb.ci.model.Competition;
import org.sb.ci.model.Robot;
import org.sb.ci.model.RobotDetails;
import org.sb.ci.model.Team;
import org.sb.ci.model.Text;

@Path("/text")
public class TextingService {

	Find find = new Find();
	public String current = "";
	public String highRound = "";
	public String lowRound = "";
	public String teamNumber = "";
	public String teamId = "";
	public String robotId = "";

	public String style = "";

	public String teleHighGoalSuccess = "";
	public String teleLowGoalSuccess = "";
	public String teleHighGoalFail = "";
	public String teleLowGoalFail = "";

	public String autoHighGoalSuccess = "";
	public String autoLowGoalSuccess = "";
	public String autoHighGoalFail = "";
	public String autoLowGoalFail = "";
	public String autoHot = "";

	public String throwSuccess = "";
	public String catchSuccess = "";
	public String passSuccess = "";
	public String recieveSuccess = "";

	public String throwFail = "";
	public String catchFail = "";
	public String passFail = "";
	public String recieveFail = "";

	public String numberOfWins = "";
	public String numberOfLosses = "";

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{teamNumber}")
	public Text getText(@PathParam("teamNumber") String teamNumber) {

		Text text = new Text();
		Text temp = new Text();

		this.teamNumber = teamNumber;
		HashMap data = find.findSomething("team", new String[] { "teamNumber" }, new String[] { teamNumber });
		Team team = new Team(data);
		teamId = team.getTeamId();

		if (teamId != null) {
			HashMap robotData = find.findSomething("robot", new String[] { "teamId" }, new String[] { teamId });
			Robot robot = new Robot(robotData);
			robotId = robot.getRobotId();

			HashMap competitionData = find.findSomething("competition", new String[] { "current" },
					new String[] { "1" });
			Competition comp = new Competition(competitionData);
			current = comp.getCompetitionId();

			HashMap low = find.findSomething("SELECT MIN(ROUND_ID) AS minimum FROM ROUND WHERE COMPETITION_ID = '"
					+ current + "'");
			lowRound = (String) low.get("minimum");

			HashMap high = find.findSomething("SELECT MAX(ROUND_ID) AS maximum FROM ROUND WHERE COMPETITION_ID = '"
					+ current + "'");
			highRound = (String) high.get("maximum");

			HashMap autoHighSuccess = find
					.findSomething("SELECT SUM(AUTO_HIGH_SHOT_SUCCESS) AS AUTO_HIGH_GOAL_SUCCESS FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(autoHighSuccess);
			autoHighGoalSuccess = temp.getAutoHighGoalSuccess();

			HashMap autoLowSuccess = find
					.findSomething("SELECT SUM(AUTO_LOW_SHOT_SUCCESS) AS AUTO_LOW_GOAL_SUCCESS FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(autoLowSuccess);
			autoLowGoalSuccess = temp.getAutoLowGoalSuccess();

			HashMap autoHighFail = find
					.findSomething("SELECT SUM(AUTO_HIGH_SHOT_MISS) AS AUTO_HIGH_GOAL_FAIL FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(autoHighFail);
			autoHighGoalFail = temp.getAutoHighGoalFail();

			HashMap autoLowFail = find
					.findSomething("SELECT SUM(AUTO_LOW_SHOT_FAIL) AS AUTO_LOW_GOAL_FAIL FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(autoLowFail);
			autoLowGoalFail = temp.getAutoLowGoalFail();

			HashMap autoHot = find.findSomething("robotdetails", new String[] { "robotId" }, new String[] { robotId });
			RobotDetails robot2 = new RobotDetails(autoHot);
			this.autoHot = robot2.getHotTarget();

			HashMap high_goal = find
					.findSomething("SELECT SUM(TELE_TOP_SUCCESS) AS HIGH_GOAL_SUCCESS FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(high_goal);
			teleHighGoalSuccess = temp.getHighGoalSuccess();

			HashMap low_goal = find
					.findSomething("SELECT SUM(TELE_BOTTOM_SUCCESS) AS LOW_GOAL_SUCCESS FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(low_goal);
			teleLowGoalSuccess = temp.getLowGoalSuccess();

			HashMap high_goal_fail = find
					.findSomething("SELECT SUM(TELE_TOP_FAIL) AS HIGH_GOAL_FAIL FROM SCORE WHERE team_id = '" + teamId
							+ "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(high_goal_fail);
			teleHighGoalFail = temp.getHighGoalFail();

			HashMap low_goal_fail = find
					.findSomething("SELECT SUM(TELE_BOTTOM_FAIL) AS LOW_GOAL_FAIL FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(low_goal_fail);
			teleLowGoalFail = temp.getLowGoalFail();

			HashMap throwSuccess = find
					.findSomething("SELECT SUM(TELE_THROW_SUCCESS) AS THROW_SUCCESS FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(throwSuccess);
			this.throwSuccess = temp.getThrowSuccess();

			HashMap catchSuccess = find
					.findSomething("SELECT SUM(TELE_CATCH_SUCCESS) AS CATCH_SUCCESS FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(catchSuccess);
			this.catchSuccess = temp.getCatchSuccess();

			HashMap passSuccess = find
					.findSomething("SELECT SUM(TELE_PASS_SUCCESS) AS PASS_SUCCESS FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(passSuccess);
			this.passSuccess = temp.getPassSuccess();

			HashMap recieveSuccess = find
					.findSomething("SELECT SUM(TELE_RECIEVE_SUCCESS) AS RECIEVE_SUCCESS FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(recieveSuccess);
			this.recieveSuccess = temp.getRecieveSuccess();

			HashMap throwFail = find
					.findSomething("SELECT SUM(TELE_THROW_FAIL) AS THROW_FAIL FROM SCORE WHERE team_id = '" + teamId
							+ "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(throwFail);
			this.throwFail = temp.getThrowFail();

			HashMap catchFail = find
					.findSomething("SELECT SUM(TELE_CATCH_FAIL) AS CATCH_FAIL FROM SCORE WHERE team_id = '" + teamId
							+ "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(catchFail);
			this.catchFail = temp.getCatchFail();

			HashMap passFail = find
					.findSomething("SELECT SUM(TELE_PASS_FAIL) AS PASS_FAIL FROM SCORE WHERE team_id = '" + teamId
							+ "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(passFail);
			this.passFail = temp.getPassFail();

			HashMap recieveFail = find
					.findSomething("SELECT SUM(TELE_RECIEVE_FAIL) AS RECIEVE_FAIL FROM SCORE WHERE team_id = '"
							+ teamId + "' AND (ROUND_ID <= '" + highRound + "' AND ROUND_ID >= '" + lowRound + "')");
			temp.setDataMap(recieveFail);
			this.recieveFail = temp.getRecieveFail();

			if (robotId != null) {
				HashMap style = find
						.findSomething("robotdetails", new String[] { "robotId" }, new String[] { robotId });
				RobotDetails robotDetails = new RobotDetails(style);
				this.style = robotDetails.getStyle();
			}

			HashMap wins = find.findSomething("select count(*) as NUMBER_OF_WINS from ROUND WHERE ((red_1_id = "
					+ teamId + " or red_2_id = " + teamId + " or red_3_id = " + teamId
					+ ") and score_red >= score_blue and COMPETITION_ID = '" + current + "') or ((blue_1_id = "
					+ teamId + " or blue_2_id = " + teamId + " or blue_3_id = " + teamId
					+ ") and score_blue >= score_red and COMPETITION_ID = '" + current + "') ");
			temp.setDataMap(wins);
			numberOfWins = temp.getNumberOfWins();

			HashMap losses = find.findSomething("select count(*) as NUMBER_OF_LOSSES from ROUND WHERE ((red_1_id = "
					+ teamId + " or red_2_id = " + teamId + " or red_3_id = " + teamId
					+ ") and score_red < score_blue and COMPETITION_ID = '" + current + "') or ((blue_1_id = " + teamId
					+ " or blue_2_id = " + teamId + " or blue_3_id = " + teamId
					+ ") and score_blue < score_red and COMPETITION_ID = '" + current + "') ");
			temp.setDataMap(losses);
			numberOfLosses = temp.getNumberOfLosses();
		}

		text.setAutoHighGoalSuccess(this.autoHighGoalSuccess);
		text.setAutoLowGoalSuccess(this.autoLowGoalSuccess);
		text.setAutoHighGoalFail(this.autoHighGoalFail);
		text.setAutoLowGoalFail(this.autoLowGoalFail);

		text.setHighGoalSuccess(this.teleHighGoalSuccess);
		text.setLowGoalSuccess(this.teleLowGoalSuccess);
		text.setHighGoalFail(this.teleHighGoalFail);
		text.setLowGoalFail(this.teleLowGoalFail);
		text.setAutoHot(this.autoHot);

		text.setThrowSuccess(this.throwSuccess);
		text.setCatchSuccess(this.catchSuccess);
		text.setPassSuccess(this.passSuccess);
		text.setRecieveSuccess(this.recieveSuccess);
		text.setThrowFail(this.throwFail);
		text.setCatchFail(this.catchFail);
		text.setPassFail(this.passFail);
		text.setRecieveFail(this.recieveFail);
		text.setStyle(this.style);
		text.setNumberOfWins(this.numberOfWins);
		text.setNumberOfLosses(this.numberOfLosses);

		return text;

	}
}
