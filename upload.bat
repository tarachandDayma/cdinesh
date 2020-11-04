echo >> README.md
git init
git add -A
set /p comment="Enter Comment: "
git commit -m "%comment%"
git branch -M main
git remote add origin https://github.com/tarachandDayma/cdinesh.git
git push -u origin main
set /p comment1="Enter"
                