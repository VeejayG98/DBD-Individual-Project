import pandas as pd

entireLibrary = pd.read_csv('booksLibrary.csv', error_bad_lines= False, delimiter='\t')
entireLibrary.columns = ['ISBN10', 'ISBN13', 'Title', 'Author', 'Cover', 'Publisher', 'Pages']
entireLibrary['Author'] = entireLibrary['Author'].map(
    lambda x: x.split(',') if pd.isnull(x) == False else [x])
entireLibrary = entireLibrary.explode('Author')
authors = entireLibrary['Author'].unique()

#Getting Authors Dict
index = 1
author_dict = {}
for author in authors:
    if author not in author_dict:
        author_dict[author] = index
        index += 1

booksTable = entireLibrary[['ISBN13', 'Title']]
booksTable.drop_duplicates(inplace= True)


bookAuthors = entireLibrary[['Author', 'ISBN13']]
bookAuthors['Author'] = bookAuthors['Author'].map(lambda x: author_dict[x])

authorsTable = pd.DataFrame.from_dict(author_dict.items())
authorsTable.columns = ['Name', 'Author_id']
authorsTable = authorsTable.reindex(columns = ['Author_id', 'Name'])

authorsTable.to_csv('Authors.csv', index = False)
booksTable.to_csv('Books.csv', index = False)
bookAuthors.to_csv('BookAuthors.csv', index = False)