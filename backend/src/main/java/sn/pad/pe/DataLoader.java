package sn.pad.pe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import sn.pad.pe.colonie.bo.Question;
import sn.pad.pe.colonie.repositories.QuestionRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public void run(String... args) throws Exception {
        if (questionRepository.count() == 0) {
            Question q1 = new Question("Avez-vous été bien logé ?");
            Question q2 = new Question("Avez-vous été bien encadré ?");
            Question q3 = new Question("Avez-vous bien mangé ?");
            questionRepository.save(q1);
            questionRepository.save(q2);
            questionRepository.save(q3);
        }
    }
}