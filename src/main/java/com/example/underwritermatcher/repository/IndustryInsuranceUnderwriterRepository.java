package com.example.underwritermatcher.repository;

import com.example.underwritermatcher.entity.IndustryInsuranceUnderwriter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IndustryInsuranceUnderwriterRepository
        extends JpaRepository<IndustryInsuranceUnderwriter, Long> {

    /*
    * Find all industry insurance underwriters by industry id and insurance id
    * @param industryId the industry id
    * @param insuranceId the insurance id
    * @return a list of industry insurance underwriters
    */
    List<IndustryInsuranceUnderwriter> findByIndustry_IdAndInsurance_Id(Long industryId, Long insuranceId);
}