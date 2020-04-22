package com.qucat.quiz.services;

import com.qucat.quiz.repositories.dao.implementation.QuizDaoImpl;
import com.qucat.quiz.repositories.entities.Quiz;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Slf4j
@Service
public class QuizzesService {

    @Autowired
    private QuizDaoImpl quizDao;

    public Page<Quiz> showPage(@RequestParam Optional<Integer> page,
                               @RequestParam Optional<Integer> size) {
        Page<Quiz> quiz = quizDao.findAll(PageRequest.of(page.orElse(0), size.orElse(10),
                Sort.Direction.DESC, "id"));
        return quiz;
    }

}
