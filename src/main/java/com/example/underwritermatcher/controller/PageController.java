package com.example.underwritermatcher.controller;

import com.example.underwritermatcher.repository.IndustryRepository;
import com.example.underwritermatcher.repository.InsuranceRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    private final IndustryRepository industryRepository;
    private final InsuranceRepository insuranceRepository;

    /*
    * Constructor for PageController
    * @param industryRepository the repository for industries
    * @param insuranceRepository the repository for insurances
    */
    public PageController(IndustryRepository industryRepository, InsuranceRepository insuranceRepository) {
        this.industryRepository = industryRepository;
        this.insuranceRepository = insuranceRepository;
    }

    /*
    * Index page
    * @param model the model
    * @return the index page
    */
    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("industries", industryRepository.findAll());
        model.addAttribute("insurances", insuranceRepository.findAll());
        return "index";
    }
}