package com.example.underwritermatcher.repository;

import com.example.underwritermatcher.entity.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceRepository extends JpaRepository<Insurance, Long> {
}