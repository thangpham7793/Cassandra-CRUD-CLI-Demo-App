library(tidyverse)

#read csv file into a table called students
students <- read_csv('find-all-students-2020-05-20T21-47-47-982Z.csv')

#delete the id column
students$id <- NULL

#convert the gende column to factor
students$Gender <- factor(students$Gender, labels = c('M', 'F'))

summary <- students %>%
  summarise(Total_Docs = sum(`Number of Owned Documents`), 
            Total_Comments = sum(`Number of Comments`)) %>%
  mutate(Comment_Doc_Ratio=Total_Comments/Total_Docs)

summary$Total_Docs
summary$Total_Comments
round(summary$Comment_Doc_Ratio, 2)

summary2 <- students %>%
  group_by(Courses) %>%
  summarize(Total_Docs = sum(`Number of Owned Documents`), 
                 Total_Comments = sum(`Number of Comments`)) %>%
  mutate(ratio=Total_Comments/Total_Docs) %>%
  arrange(ratio)
  
round(summary2$ratio[3]/mean(c(summary2$ratio[1], summary2$ratio[2])), 0)

summary2 %>%
  ggplot(aes(x=Courses, y=ratio, fill=Courses)) +
  geom_col() +
  ggtitle('Comment/Document Ratio Across 3 Courses')

students %>%
  group_by(Courses) %>%
  summarise(Total_Docs = sum(`Number of Owned Documents`), 
            Total_Comments = sum(`Number of Comments`)) %>%
  gather(Total_Docs, Total_Comments, key='Total', value='value') %>%
  arrange(Courses) %>%
  ggplot(aes(x=Total, y=value, fill=Courses)) +
  geom_col(position = 'dodge') +
  xlab('') +
  ylab('Count') +
  ggtitle('Document Counts vs Comment Counts By Courses')
