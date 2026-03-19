package com.example.underwritermatcher.controller;

import com.example.underwritermatcher.service.MatchService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MatchController {

    private final MatchService matchService;

    /*
    * Constructor for MatchController
    * @param matchService the service for matches
    */
    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    /*
    * Match page
    * @param industryId the industry id
    * @param insuranceId the insurance id
    * @param model the model
    * @return the match page
    */
    @GetMapping("/match")
    public String match(@RequestParam Long industryId,
                        @RequestParam Long insuranceId,
                        Model model) {

        model.addAttribute("results", matchService.findMatches(industryId, insuranceId));
        return "results";
    }
}