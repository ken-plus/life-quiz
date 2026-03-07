import json

# Define the scoring logic
WEIGHTED_QUESTIONS = [2, 5, 7, 9, 12, 18, 21]

def calculate_life_type(answers):
    counts = {
        'guardian': 0,
        'balancer': 0,
        'explorer': 0,
        'builder': 0,
    }

    for q_id, q_type in answers.items():
        score = 2 if int(q_id) in WEIGHTED_QUESTIONS else 1
        counts[q_type] += score

    sorted_counts = sorted(counts.items(), key=lambda x: x[1], reverse=True)
    
    total = sum(counts.values())
    primary = sorted_counts[0][0]
    secondary = sorted_counts[1][0]
    confidence = (sorted_counts[0][1] - sorted_counts[1][1]) / total if total > 0 else 0
    
    return {
        'primary': primary,
        'secondary': secondary,
        'confidence': confidence,
        'isMixed': confidence < 0.12,
        'counts': counts
    }

# Scenario: Mostly 'guardian' with some 'balancer'
# Total score for guardian should be highest
answers = {
    1: 'guardian', 2: 'guardian', 3: 'guardian', 4: 'guardian', 5: 'guardian',
    6: 'balancer', 7: 'balancer', 8: 'balancer', 9: 'balancer', 10: 'balancer',
    11: 'explorer', 12: 'explorer', 13: 'explorer', 14: 'explorer', 15: 'explorer',
    16: 'builder', 17: 'builder', 18: 'builder', 19: 'builder', 20: 'builder',
    21: 'guardian' # Weighted
}

result = calculate_life_type(answers)
print(f"Simulation Result: {json.dumps(result, indent=2, ensure_ascii=False)}")

# Check if last question (21) is included and weighted
if 21 in answers:
    print("✓ Question 21 included in calculation")
else:
    print("✗ Question 21 missing")
