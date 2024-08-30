// controllers/gradeController.js
import Grade from '../models/Grade.js';
import Criteria from '../models/Criteria.js';

export const calculateGrade = async (req, res) => {
  const { studentId, examScore, examTotal, quizzes, recitations, instructorId } = req.body;

  try {
    // Calculate the exam part (40%)
    const examPercentage = (examScore / examTotal) * 100;
    const examWeighted = examPercentage * 0.4;

    // Fetch criteria from the database
    const criteria = await Criteria.findOne({ instructorId });

    if (!criteria) {
      return res.status(400).json({ message: 'Criteria not found' });
    }

    // Calculate the dynamic components (60%)
    let quizzesScore = 0;
    let recitationsScore = 0;

    // Calculate quizzes part
    if (quizzes.length > 0) {
      const totalQuizScore = quizzes.reduce((acc, quiz) => acc + (quiz.score / quiz.total) * 100, 0);
      quizzesScore = totalQuizScore / quizzes.length; // Average quizzes score
    }

    // Calculate recitations part
    if (recitations.length > 0) {
      const totalRecitationScore = recitations.reduce((acc, recitation) => acc + (recitation.score / recitation.total) * 100, 0);
      recitationsScore = totalRecitationScore / recitations.length; // Average recitations score
    }

    // Apply weights from criteria
    const quizWeight = criteria.criteria.find(c => c.name === 'quizzes')?.weight || 0;
    const recitationWeight = criteria.criteria.find(c => c.name === 'recitations')?.weight || 0;

    const dynamicScore = (quizzesScore * quizWeight) + (recitationsScore * recitationWeight);

    // Final grade calculation
    const finalGrade = (examWeighted + dynamicScore) * 0.6;

    // Save the grade
    const grade = new Grade({
      studentId,
      examScore,
      examTotal,
      quizzes,
      recitations,
      finalGrade,
    });

    await grade.save();

    res.json({ finalGrade });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
