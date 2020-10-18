package SDMSystemDTO.feedback;

public class DTOFeedback {
    private float rank;
    private String comment;
    private final String feedbackGiver;
    private final int storeGotFeedbackId;

    public DTOFeedback(float rank, String comment, String feedbackGiver, int storeGotFeedbackId) {
        this.rank = rank;
        this.comment = comment;
        this.feedbackGiver = feedbackGiver;
        this.storeGotFeedbackId = storeGotFeedbackId;
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
