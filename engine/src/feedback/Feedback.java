package feedback;

import SDMSystem.user.User;
import SDMSystem.user.customer.Customer;
import SDMSystemDTO.feedback.DTOFeedback;

import java.time.LocalDate;

public class Feedback {
    private static final int MIN_RANK = 1;
    private static final int MAX_RANK = 5;
    private float rank;
    private String comment;
    private final String feedbackGiver;
    private final int storeGotFeedbackId;
    private LocalDate date;
    public Feedback(float rank, String comment, String feedbackGiver, int storeGotFeedbackId, LocalDate date) {
        this.rank = rank;
        this.comment = comment;
        this.feedbackGiver = feedbackGiver;
        this.storeGotFeedbackId = storeGotFeedbackId;
        this.date = date;
    }

    public float getRank() {
        return rank;
    }

    public String getComment() {
        return comment;
    }

    public String getFeedbackGiver() {
        return feedbackGiver;
    }

    public int getStoreGotFeedbackId() {
        return storeGotFeedbackId;
    }

    public DTOFeedback createDTOFeedbackFromFeedback() {
        return new DTOFeedback(
                rank,
                comment,
                feedbackGiver,
                storeGotFeedbackId,
                date
        );
    }
}
