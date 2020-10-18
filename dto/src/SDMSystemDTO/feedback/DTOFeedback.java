package SDMSystemDTO.feedback;

import java.time.LocalDate;

public class DTOFeedback {
    private float rank;
    private String comment;
    private final String feedbackGiver;
    private final int storeGotFeedbackId;
    private final LocalDate date;
    public DTOFeedback(float rank, String comment, String feedbackGiver, int storeGotFeedbackId, LocalDate date) {
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
}
