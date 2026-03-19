package com.example.underwritermatcher.repository;

import com.example.underwritermatcher.entity.Industry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndustryRepository extends JpaRepository<Industry, Long> {
}